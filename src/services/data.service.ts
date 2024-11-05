import { Transfer, Network, Token, PaginatedResponse } from "./interfaces";

/**
 * Service class for handling data operations related to fetching transfers, networks, and tokens.
 */
export class DataService {
  private readonly HTTP_BASE_URL: string = "/api";

  /**
   * Retrieves a paginated list of transfers.
   * @param page - The page number to retrieve.
   * @returns A promise that resolves to a paginated response containing transfer data.
   * @throws Error if the API request fails.
   */
  async getAllTransfers(page: number): Promise<PaginatedResponse<Transfer>> {
    try {
      const url = `${this.HTTP_BASE_URL}/transactions?page=${page}&limit=10`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  /**
   * Retrieves a list of all available networks.
   * @returns A promise that resolves to a paginated response containing network data.
   * @throws Error if the API request fails.
   */
  async getAllNetworks(): Promise<PaginatedResponse<Network>> {
    try {
      const url = `${this.HTTP_BASE_URL}/networks`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Detailed error:", error);
      throw error;
    }
  }

  /**
   * Retrieves a list of all available tokens.
   * @returns A promise that resolves to a paginated response containing token data.
   * @throws Error if the API request fails.
   */
  async getAllTokens(): Promise<PaginatedResponse<Token>> {
    try {
      const url = `${this.HTTP_BASE_URL}/tokens`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tokens");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching tokens:", error);
      throw error;
    }
  }
}
