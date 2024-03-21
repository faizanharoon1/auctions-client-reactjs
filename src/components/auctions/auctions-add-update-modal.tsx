import { Button, Modal, Box } from "@mui/material";
import { useState } from "react";
import AuctionsForm from "./auction-form";

export function AuctionAddUpdateModalBox({gridRefresh}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
     width: { xs: '90%', sm: 600 }, 
    bgcolor: 'background.paper',
    boxShadow: 14,
    p: 2,
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add</Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {/* Passing refreshAuctions to AuctionsForm */}
          <AuctionsForm gridRefresh={gridRefresh} />
        </Box>
      </Modal>
    </>
  );
}