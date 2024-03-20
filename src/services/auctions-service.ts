
export class AuctionService {
   static async fetchAuctionItems(page: number, pageSize:number): Promise<AuctionItem[]> {
    try {
      const response = await fetch('http://localhost:3000/auctions');
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
    const response = await fetch('http://localhost:3000/auctions', {
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
    const response = await fetch(`http://localhost:3000/bids`, {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  }
}