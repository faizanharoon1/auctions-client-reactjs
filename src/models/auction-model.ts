interface Item {
  itemDescription: string;
  itemId?: number;
}

interface AuctionItem {
  auctionItemId?: number;
  bidderName?: string;
  userId: string;
  currentBid?: number;
  reservePrice: number;
  auctionName: string;
  items: Item[];
  totalRows?:number;
}