
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Auctions from './pages/auctions'; // Make sure to import your Auctions component
import Home from './pages/home'; // Assuming you have a Home component
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

const LinkBehavior = styled(Link)({
  textDecoration: 'none',
  color: 'inherit', // Inherit the color from the AppBar component
});

function App() {
  return (
    <Container>
    <BrowserRouter>

 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
    
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blue Bay  
          </Typography>
         <Button color="inherit" component={LinkBehavior} to="/">Home</Button>
          <Button color="inherit" component={LinkBehavior} to="/auctions">Auctions</Button>
          {/* Add more navigation buttons as needed */}
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
