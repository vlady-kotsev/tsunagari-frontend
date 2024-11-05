import { Transfer, Network, Token, PaginatedResponse } from "./interfaces";

export class DataService {
  private readonly HTTP_BASE_URL: string = "/api";

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
