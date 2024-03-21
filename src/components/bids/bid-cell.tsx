import { Box, TextField, Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState } from 'react';

interface BidCellProps {
  params: GridRenderCellParams;
  onBid: (id: number, bidValue: number) => void;
}

function BidCell({ params, onBid }:BidCellProps) {
  const [bidValue, setBidValue] = useState(0);

  const handleBid = () => {
    // Call the parent component's bid function or service
    onBid(params.row.id, Number(bidValue));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        size="small"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        variant="outlined"
        value={bidValue}
        onChange={(e) => setBidValue(Number(e.target.value))}
      />
 <Button
      variant="contained"
      color="success"
      onClick={handleBid}
      startIcon={<AttachMoneyIcon />}
    >
      Bid
    </Button>
    </Box>
  );
};

export default BidCell;