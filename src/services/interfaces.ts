/** 
 * Represents a token transfer transaction between chains
 * @interface Transfer
 */
export interface Transfer {
  /** The user's address or identifier */
  user: string;
  /** The token address on the origin chain */
  originTokenAddress: string;
  /** The token address on the destination chain */
  destinationTokenAddress: string;
  /** The amount being transferred (as a string to handle large numbers) */
  amount: string;
  /** The chain ID of the origin network */
  originChainId: number;
  /** The chain ID of the destination network */
  destinationChainId: number;
  /** Timestamp of when the transfer was initiated */
  timestamp: Date;
}

/**
 * Represents a blockchain network configuration
 * @interface Network
 */
export interface Network {
  /** Unique identifier for the network */
  id: string;
  /** Human-readable name of the network */
  name: string;
  /** Chain ID of the network */
  chainId: number;
  /** Address of the bridge contract on this network */
  bridgeAddress: string;
}

/**
 * Represents a token configuration
 * @interface Token
 */
export interface Token {
  /** Token contract address */
  address: string;
  /** Human-readable name of the token */
  name: string;
  /** Token symbol (e.g., "ETH", "USDT") */
  symbol: string;
  /** Chain ID where this token exists */
  chainId: number;
  /** Whether this is the chain's native token */
  isNative: boolean;
  /** URL to the token's logo image */
  logoUrl: string;
}

/**
 * Generic interface for paginated API responses
 * @interface PaginatedResponse
 * @template T - The type of items being paginated
 */
export interface PaginatedResponse<T> {
  /** Array of items for the current page */
  items: T[];
  /** Metadata about the pagination */
  meta: {
    /** Total number of items across all pages */
    totalItems: number;
    /** Number of items on the current page */
    itemCount: number;
    /** Maximum number of items per page */
    itemsPerPage: number;
    /** Total number of pages */
    totalPages: number;
    /** Current page number */
    currentPage: number;
  };
}
