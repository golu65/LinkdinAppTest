import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../context/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateOtp = () => {
    if (phone.trim() === '') {
      setErrorMessage('Please enter your phone number.');
      setOpenErrorDialog(true);
      return;
    }
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setOpenOtpDialog(true);
    setShowOtpInput(true);
  };

  const handleLogin = () => {
    if (otp === generatedOtp) {
      const user = { id: Date.now().toString(), phone }; // Generating a dummy id for demonstration
      dispatch(login(user));
      navigate('/feed');
    } else {
      setErrorMessage('Authentication failed. Please try again.');
      setOpenErrorDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenOtpDialog(false);
    setOpenErrorDialog(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            sx: { padding: '8px 12px' },
          }}
        />
        {!showOtpInput && (
          <Button variant="contained" color="primary" onClick={generateOtp}>
            Generate OTP
          </Button>
        )}
        {showOtpInput && (
          <>
            <TextField
              label="Enter OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                sx: { padding: '8px 12px' },
              }}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </>
        )}
      </Box>

      <Dialog open={openOtpDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ textAlign: 'center', fontWeight: '500', color: 'black' }}>OTP</DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', color: 'red' }}>{generatedOtp}</Typography>
        </DialogContent>
      </Dialog>

      <Dialog open={openErrorDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;
