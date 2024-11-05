/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Bridge.module.scss";
import { DataService } from "../services/data.service";
import { useEffect, useState, FC } from "react";
import { Network, Token, Transfer } from "../services/interfaces";
import Table from "../components/Table/Table";
import { Connect } from "../components/Connect/Connect";
import { useAccount, useChainId } from "wagmi";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../toastr";
import { ethers } from "ethers";

import bridgeAbi from "../abi/diamond.json";
import erc20Abi from "../abi/erc20.json";

/**
 * Bridge component that enables cross-chain token transfers.
 * Handles token locking, burning, and approval operations between different blockchain networks.
 * 
 * Features:
 * - Network selection for source and destination chains
 * - Token selection and amount input
 * - Transaction processing with approval and transfer steps
 * - Transfer history display with pagination
 * 
 * @returns A page component with bridge functionality and transfer history
 */
const Bridge: FC = () => {
  const [networks, setNetworks] = useState<Map<number, Network>>(
    new Map<number, Network>()
  );
  const [tokensPerNetwork, setTokensPerNetwork] = useState<
    Map<number, Token[]>
  >(new Map<number, Token[]>());
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destinationChain, setDestinationChain] = useState<number | "">("");
  const [originChain, setOriginChain] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<Token | "">("");
  const [deactivateInput, setDeactivateInput] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { isConnected } = useAccount();
  const metamaskChainId = useChainId();
  /**
   * Fetches initial data including networks, tokens, and transfer history.
   * Updates state with the fetched data and handles loading/error states.
   */
  useEffect(() => {
    resetState();

    setOriginChain(metamaskChainId);
    const dataService = new DataService();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [networkResponse, tokensResponse, transfersResponse] =
          await Promise.all([
            dataService.getAllNetworks(),
            dataService.getAllTokens(),
            dataService.getAllTransfers(currentPage + 1),
          ]);

        const networkMap = new Map<number, Network>();

        networkResponse.items.forEach((network) => {
          networkMap.set(network.chainId, network);
        });
        setNetworks(networkMap);

        const tokensPerNetworkMap = new Map<number, Token[]>();
        tokensResponse.items.forEach((token) => {
          const networkId = token.chainId;
          if (!tokensPerNetworkMap.has(networkId)) {
            tokensPerNetworkMap.set(networkId, []);
          }
          tokensPerNetworkMap.get(networkId)?.push(token);
        });
        setTokensPerNetwork(tokensPerNetworkMap);

        setTransfers(transfersResponse.items);
        setTotalPages(transfersResponse.meta.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [metamaskChainId, isConnected, currentPage]);

  useEffect(() => {
    if (error) {
      notifyError(
        (error as string) || "Something went wrong, please try again"
      );
      resetState();
    }
  }, [error]);

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestinationChain(event.target.value ? Number(event.target.value) : "");
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value ? Number(event.target.value) : "");
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tokenAddress = event.target.value;

    const token = tokensPerNetwork
      .get(originChain)
      ?.find((t) => t.address === tokenAddress);
    setSelectedToken(token || "");
  };

  const resetState = () => {
    setSelectedToken("");
    setDestinationChain("");
    setAmount("");
    setDeactivateInput(false);
    setError(null);
    setIsProcessing(false);
    setIsLoading(false);
  };

  /**
   * Handles the burning of wrapped tokens for cross-chain transfer.
   * @throws {Error} If the burn operation fails or required parameters are missing
   */
  const handleBurn = async () => {
    if (!selectedToken || !destinationChain || !amount || !window.ethereum) {
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bridgeAddress = networks.get(originChain)?.bridgeAddress;

      if (!bridgeAddress) {
        throw new Error("Bridge address not found");
      }

      const bridgeContract = new ethers.Contract(
        bridgeAddress,
        bridgeAbi,
        signer
      );
      const amountInWei = ethers.parseUnits(amount.toString(), 18);

      const tx = await bridgeContract.burnWrappedToken(
        amountInWei,
        selectedToken.address,
        BigInt(destinationChain)
      );

      await tx.wait();
    } catch {
      throw new Error("Failed to burn tokens");
    }
  };

  /**
   * Handles token approval for the bridge contract.
   * @throws {Error} If the approval operation fails or required parameters are missing
   */
  const handleApprove = async () => {
    if (!selectedToken || !window.ethereum) {
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const bridgeAddress = networks.get(originChain)?.bridgeAddress;
      if (!bridgeAddress) {
        throw new Error("Bridge address not found");
      }

      const tokenContract = new ethers.Contract(
        selectedToken.address,
        erc20Abi,
        signer
      );
      const amountInWei = ethers.parseUnits(amount!.toString(), 18);

      const tx = await tokenContract.approve(bridgeAddress, amountInWei);
      await tx.wait();
    } catch {
      throw new Error("Failed to approve tokens");
    }
  };

  /**
   * Handles locking of native tokens for cross-chain transfer.
   * @throws {Error} If the lock operation fails or required parameters are missing
   */
  const handleLock = async () => {
    if (!selectedToken || !destinationChain || !amount || !window.ethereum) {
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bridgeAddress = networks.get(originChain)?.bridgeAddress;

      if (!bridgeAddress) {
        throw new Error("Bridge address not found");
      }

      const bridgeContract = new ethers.Contract(
        bridgeAddress,
        bridgeAbi,
        signer
      );
      const amountInWei = ethers.parseUnits(amount.toString(), 18);

      const tx = await bridgeContract.lockTokens(
        amountInWei,
        selectedToken.address,
        BigInt(destinationChain)
      );

      await tx.wait();
    } catch {
      throw new Error("Failed to lock tokens");
    }
  };

  /**
   * Initiates the transfer process, including approval and either lock or burn operations.
   * Handles error states and success notifications.
   */
  const handleTransfer = async () => {
    if (!selectedToken || !destinationChain || !amount || !window.ethereum) {
      return;
    }

    try {
      setIsProcessing(true);
      setDeactivateInput(true);
      setError(null);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts available");
      }
      const minBridgeableAmount = await getMinBridgeableAmount();

      if (!minBridgeableAmount) {
        throw new Error("Failed to get minimum bridgeable amount");
      }
      if (amount < minBridgeableAmount) {
        throw new Error("Amount is less than the minimum bridgeable amount");
      }

      await handleApprove();
      if (selectedToken.isNative) {
        await handleLock();
      } else {
        await handleBurn();
      }
      if (!error) {
        notifySuccess("Transfer successful!");
      }
    } catch (err: any) {
      if (err.message.length > 50) {
        setError(`${err.message.slice(0, 50)}...`);
      } else {
        setError(err.message);
      }
    } finally {
      setIsProcessing(false);
      setDeactivateInput(false);
    }
  };

  /**
   * Checks if the transfer button should be enabled based on current state.
   * @returns {boolean} True if transfer is enabled, false otherwise
   */
  const isTransferEnabled = () => {
    return (
      !isLoading &&
      selectedToken !== "" &&
      destinationChain !== "" &&
      amount !== "" &&
      amount !== 0 &&
      !isProcessing &&
      window.ethereum !== undefined
    );
  };

  /**
   * Retrieves the minimum bridgeable amount from the bridge contract.
   * @returns {Promise<number>} The minimum amount that can be bridged
   * @throws {Error} If the operation fails or no provider is available
   */
  const getMinBridgeableAmount = async () => {
    if (!window.ethereum) {
      throw new Error("No ethereum provider found");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const bridgeAddress = networks.get(originChain)?.bridgeAddress;

      if (!bridgeAddress) {
        throw new Error("Bridge address not found");
      }

      const bridgeContract = new ethers.Contract(
        bridgeAddress,
        bridgeAbi,
        provider
      );

      const minAmount =
        await bridgeContract.getMinimumBridgeableAmount.staticCall();
      const formattedAmount = ethers.formatUnits(minAmount, 18);
      return Number(formattedAmount);
    } catch {
      throw new Error("Failed to get minimum bridgeable amount");
    }
  };

  return (
    <div className={styles["bridge-container"]}>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styles["bridge-header"]}>
        <Connect />
        {isConnected && (
          <div className={styles["origin-chain"]}>{originChain}</div>
        )}
      </div>
      {!isConnected ? (
        <div className={styles["connect-message"]}>
          Please connect your wallet to continue
        </div>
      ) : (
        <>
          <div className={styles["bridge-form"]}>
            <div className={styles["dropdown-container"]}>
              <select
                id="destinationChain"
                value={destinationChain}
                onChange={handleDestinationChange}
                className={styles["dropdown"]}
                disabled={deactivateInput}
              >
                <option disabled value="">
                  Select destination chain
                </option>
                {Array.from(networks.values()).map((network) => {
                  const networkID = network.chainId;
                  if (networkID === originChain) return;
                  return (
                    <option key={network.id} value={networkID}>
                      {network.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles["dropdown-container"]}>
              <select
                id="availableTokensForOriginNetwork"
                value={selectedToken ? selectedToken.address : ""}
                onChange={handleTokenChange}
                className={styles["dropdown"]}
                disabled={deactivateInput}
              >
                <option disabled value="">
                  Select token to transfer
                </option>
                {tokensPerNetwork.get(originChain)?.map((token) => (
                  <option key={token.address} value={token.address}>
                    {`${token.name} - ${token.isNative ? "Native" : "Wrapped"}`}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              value={amount}
              id="amountInput"
              className={styles["amount-input"]}
              placeholder="amount in ethers"
              onChange={handleAmountChange}
              disabled={deactivateInput}
            />
          </div>
          <button
            onClick={handleTransfer}
            disabled={!isTransferEnabled()}
            className={styles["call-button"]}
          >
            {isProcessing ? "Processing..." : "Transfer"}
          </button>
          {error && (
            <div className={styles["error-message"]}>
              Error processing transaction. Please try again.:
              {error as string}
            </div>
          )}
        </>
      )}
      <Table
        transfers={transfers}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Bridge;
