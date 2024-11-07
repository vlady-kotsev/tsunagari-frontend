import { FC, useState } from "react";
import styles from "./Table.module.scss";
import { Transfer } from "../../services/interfaces";
import { formatUnits } from "ethers";
import { AiFillRightCircle } from "react-icons/ai";
import { AiFillLeftCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";

/** Props for the Table component */
interface TableProps {
  /** Array of transfer records to display */
  transfers: Transfer[];
  /** Total number of pages available */
  totalPages: number;
  /** Function to update the current page number */
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Table component that displays transfer records with pagination.
 * Allows copying of addresses and displays transaction details.
 *
 * @param props - Component properties
 * @param props.transfers - Array of transfer records to display
 * @param props.totalPages - Total number of pages available
 * @param props.setCurrentPage - Function to update the current page number
 * @returns A table with transfer records and pagination controls
 */
const Table: FC<TableProps> = ({ transfers, totalPages, setCurrentPage }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /**
   * Formats an address to show only the first 6 and last 4 characters
   * @param address - The full address to format
   * @returns The shortened address string
   */
  const shortFormatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  /**
   * Handles copying text to clipboard when a cell is clicked
   * @param e - The click event
   * @param text - The text to copy
   */
  const handleCopy = async (
    e: React.MouseEvent<HTMLTableCellElement>,
    text: string
  ): Promise<void> => {
    try {
      const element = e.target as HTMLElement;

      if (element?.id) {
        await navigator.clipboard.writeText(text);
        setCopiedId(element.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Origin Chain</th>
            <th>Destination Chain</th>
            <th>Transfered Token</th>
            <th>Received Token</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.timestamp.toString()}>
              <td
                id={`user-${transfer.timestamp.toString()}`}
                title={transfer.user}
                onClick={(e) => handleCopy(e, transfer.user)}
                className={styles.copyable}
              >
                {copiedId === `user-${transfer.timestamp.toString()}`
                  ? "Copied!"
                  : shortFormatAddress(transfer.user)}
              </td>
              <td>{transfer.originChainId}</td>
              <td>{transfer.destinationChainId}</td>
              <td
                id={`origin-${transfer.timestamp.toString()}`}
                title={transfer.originTokenAddress}
                onClick={(e) => handleCopy(e, transfer.originTokenAddress)}
                className={styles.copyable}
              >
                {copiedId === `origin-${transfer.timestamp.toString()}`
                  ? "Copied!"
                  : shortFormatAddress(transfer.originTokenAddress)}
              </td>
              <td
                id={`destination-${transfer.timestamp.toString()}`}
                title={transfer.destinationTokenAddress}
                onClick={(e) => handleCopy(e, transfer.destinationTokenAddress)}
                className={styles.copyable}
              >
                {copiedId === `destination-${transfer.timestamp.toString()}`
                  ? "Copied!"
                  : shortFormatAddress(transfer.destinationTokenAddress)}
              </td>
              <td>{formatUnits(transfer.amount, 18)}</td>
              <td>{new Date(transfer.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {transfers.length > 10 && (
        <ReactPaginate
          containerClassName={styles.pagination}
          pageClassName={styles.pageItem}
          activeClassName={styles.active}
          onPageChange={(event) => setCurrentPage(event.selected)}
          pageCount={totalPages}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      )}
    </div>
  );
};

export default Table;
