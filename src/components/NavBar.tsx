import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../context/slices/authSlice';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('state'); 
  };

  return (
    <AppBar 
      position="fixed" 
      style={{ 
        height: '60px', 
        backgroundColor: 'rgb(255,255,255)',
        color:'#191919',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1200, 
      }}
    >
      <Container 
        style={{ 
          margin: '0', 
          padding: '0',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Toolbar 
          style={{ 
            margin: '0', 
            padding: '0',
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%'
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Test-App
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/feed">
              Feed
            </Button>
            <Button color="inherit" component={Link} to="/create-post">
              Create Post
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
