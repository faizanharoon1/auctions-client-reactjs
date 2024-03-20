import { Typography, Box, Button, TextField, Grid } from '@mui/material';
import { useRef } from 'react';
import { AuctionService } from '../../services/auctions-service';

function AuctionsForm() {
  // Use a ref to access the form element
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const newItem = {
        auctionName: formData.get('auctionName') as string,
        reservePrice: parseFloat(formData.get('reservePrice') as string),
        //bidderName: , // Assuming this is static or managed elsewhere
        items: [
          {
            itemDescription: formData.get('itemDescription') as string,
          },
        ],
      };

      try {
        const addedItem = await AuctionService.addAuctionItem(newItem);
        // Optionally reset the form or handle the added item
        formRef.current.reset();
      } catch (error) {
        console.error('Error adding auction item:', error);
      }
    }
  };

  return (
    <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add new
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Auction Name"
            name="auctionName" // Name attribute is important for FormData to work
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Reserve Price"
            type="number"
            name="reservePrice"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Item Description"
            name="itemDescription"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button type="submit" variant="contained">Add Item</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuctionsForm;
