import { Box, Typography, Snackbar, Button, Divider, Grid, Paper } from "@mui/material";
import { GridColDef, DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auctions-service";
import BidCell from "../../components/bids/bid-cell";
import { AuctionAddUpdateModalBox } from "../../components/auctions/auctions-add-update-modal";
import { useUser } from "../../store/UserContext";

function Auctions () {
    const { user } = useUser();
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
 const [page, setPage] = useState(1); // Add state to track page number
 const [bidStatusMessage, setBidStatusMessage] = useState(""); 

const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const pageSize:number = 5; // Set the page size if it's constant, or manage with state if dynamic


  const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 5, hide: true, align: 'left', sortable: false, }, // Even though it's hidden, align is set for consistency
  { field: 'auctionName', headerName: 'Name', minWidth: 200,flex:1, align: 'left', sortable: false, },
  { field: 'currentBid', headerName: 'Current Bid $', width: 170, align: 'left', sortable: false, }, 
  {
    field: 'action',
    headerName: 'Max Auto Bid Amount $',
    sortable: false,
    width: 180,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{   }}>
 <BidCell
      params={params}
      onBid={async (id, bidValue) => {
        //call AuctionService to post the bid
        const responseMessage = await AuctionService.postBid(id, bidValue, user.name);
    setBidStatusMessage(responseMessage); // Assume this returns a meaningful message
    setIsSnackbarOpen(true); // Show the snackbar with the bid status message
  // Reload auction items after a successful bid
  fetchItems(page);
      }}
    />
      </Box>
    ),
  }
];


   const fetchItems = async (page:number) => {
    const items = await AuctionService.fetchAuctionItems(page, 5);
    setAuctionItems(items);
  };

  // Callback function to be passed as a prop
  const refreshAuctions = () => {
    fetchItems(page);
  };

useEffect(() => {
  fetchItems(1);
}, []); // Dependency array is empty, meaning this effect runs only once when the component mounts


 useEffect(() => {
    fetchItems(page);
  }, [page]); // Add page to dependency array so fetchItems is called when page changes


  return (

        <Box sx={{  height: 400, width: '100%', mt:1 }}>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  open={isSnackbarOpen}
  autoHideDuration={6000} // auto hide after 6000ms
  onClose={() => setIsSnackbarOpen(false)}
  message={bidStatusMessage}
      sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'dark' } }} // Apply green background
    
/>

      <Paper elevation={6} sx={{ p: 1 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {/* Section Heading */}
            <Typography variant="h5" component="h3">
             Auctions
            </Typography>
          </Grid>
          <Grid item>
           <AuctionAddUpdateModalBox gridRefresh={refreshAuctions} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />
      <DataGrid sx={{minHeight:370}}
        rows={auctionItems}
        columns={columns}
        pageSize={pageSize}
        pagination
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(newPage:number) => setPage(newPage+1)} // Handle page change
        paginationMode="server" 
        rowCount={auctionItems[0]?.totalRows} 
      />


      </Paper>
    </Box>


  );
};

export default Auctions;
