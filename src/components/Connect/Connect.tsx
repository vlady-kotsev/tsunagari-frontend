import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import styles from "./Connect.module.scss";

/**
 * A component that allows users to connect to their MetaMask wallet.
 * @returns A button to connect to MetaMask or a disconnect button if already connected
 */
export function Connect() {
  const { address, isConnected } = useAccount();
  const { connect, status } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className={styles.connect}>
        <button onClick={() => disconnect()} className={styles.button}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className={styles.connect}>
      <button
        onClick={() => connect({ connector: injected() })}
        disabled={status === "pending"}
        className={styles.button}
      >
        {status === "pending" ? "Connecting..." : "Connect MetaMask"}
      </button>
    </div>
  );
}
