import { Box, Typography } from "@mui/material";
import { GridColDef, DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auctions-service";
import AuctionsForm from "../../components/auctions/auction-form";
import BidCell from "../../components/bids/bid-cell";
import { useSSE } from "../../hooks/outbid-sse-hook";

function Auctions () {
  const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'auctionName', headerName: 'Item Name', width: 250 },
  { field: 'currentBid', headerName: 'Current Bid',  type: 'number', width: 100 },
   {
    field: 'action',
    headerName: 'Max Auto Bid Amount',
    sortable: false,
    width: 400,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'right', gap: 1 }}>
 <BidCell
      params={params}
      onBid={async (id, bidValue) => {
        console.log(`Bid on ${id} with new value ${bidValue}`);
        //call AuctionService to post the bid
        await AuctionService.postBid(id, bidValue, "Joe");
      }}
    />
      </Box>
    ),
  }
];

const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
 const message = useSSE('http://localhost:3000/bids/outbid/sse');

  useEffect(() => {

    AuctionService.fetchAuctionItems(1,5)
      .then(setAuctionItems)
      .catch(error => console.error('Fetching auction items failed:', error));
  }, []);


  return (
       <Box sx={{ height: 400, width: '100%', mt:5 }}>
         <AuctionsForm />
      <Typography variant="h5" gutterBottom>
        Auctions {message}
      </Typography>

      <DataGrid
        rows={auctionItems}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5,10]}
      />
    </Box>
  );
};

export default Auctions;
