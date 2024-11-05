export interface Transfer {
  user: string;
  originTokenAddress: string;
  destinationTokenAddress: string;
  amount: string;
  originChainId: number;
  destinationChainId: number;
  timestamp: Date;
}

export interface Network {
  id: string;
  name: string;
  chainId: number;
  bridgeAddress: string;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  chainId: number;
  isNative: boolean;
  logoUrl: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
