import { AppConfig } from "../config/app-config";

export class AuctionService {
   static async fetchAuctionItems(page: number, pageSize:number): Promise<AuctionItem[]> {
    try {
      console.log("logged twice")
      const response = await fetch(`${AppConfig.baseUrl}/auctions?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AuctionItem[] = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch auction items:', error);
      throw error; // Rethrow to handle the error outside this function if necessary
    }
  }


  static async addAuctionItem(newItem: AuctionItem): Promise<AuctionItem> {
    const response = await fetch(`${AppConfig.baseUrl}/auctions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async postBid(auctionId: number, maxAutoBidAmount: number, bidderName:string): Promise<any> {
    // Implementation details may vary based on your API
    const response = await fetch(`${AppConfig.baseUrl}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auctionId,
        maxAutoBidAmount,
        bidderName
      }),
    });

  if (!response.ok) {
      // If the response is not ok, parse the response body to get the error message
      const errorResponse = await response.json(); // Assuming the server responds with JSON
      // Throw an error or return a structured error object/message
      return (errorResponse.message || 'An error occurred while posting the bid.');
    }

    return await response.text();
  }
}