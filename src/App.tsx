
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Auctions from './pages/auctions'; // Make sure to import your Auctions component
import Home from './pages/home'; // Assuming you have a Home component
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { Box, Container, Snackbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { useUser } from './store/UserContext';
import { UserPicker } from './components/users/UserPicker';
import { useSSE } from './hooks/outbid-sse-hook';
import { AppConfig } from './config/app-config';
import { useEffect, useState } from 'react';

const LinkBehavior = styled(Link)({
  textDecoration: 'none',
  color: 'inherit', // Inherit the color from the AppBar component
});

function App() {
   const { user } = useUser();
   const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
     const [outbidStatusMessage, setOutbidStatusMessage] = useState(""); 
//hook SSE
 const message = useSSE(`${AppConfig.baseUrl}/bids/outbid/sse?userId=${user.name}`);

 useEffect(() => {
    if (message) {
      setOutbidStatusMessage(message);
      setIsSnackbarOpen(true); // Open the Snackbar when a new message is received
    }
  }, [message]);
 
  return (
    <Container>
    <BrowserRouter>

 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
              <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  open={isSnackbarOpen}
  autoHideDuration={6000} // auto hide after 6000ms
  onClose={() => setIsSnackbarOpen(false)}
  message={outbidStatusMessage}
      sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'red' } }} // Apply green background
    
/>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontWeight: 300,
              color: 'inherit',
              textDecoration: 'none',
              
            }}
          >
            Red Bay   
            <div>
 
    </div>
          </Typography>
         <Button color="inherit" component={LinkBehavior} to="/">Home</Button>
          <Button sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}} color="inherit" component={LinkBehavior} to="/auctions">Auctions</Button>
          <UserPicker />
          
        </Toolbar>
      </AppBar>
    </Box>

   
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        {/* Define more routes as needed */}
      </Routes>
      
    </BrowserRouter>
</Container>
  );
};

export default App;
