import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { forgotPassword, verifyPassword, resetPassword } from './api';
import axios from 'axios';

// OTP Input component
const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = Array(6).fill(0).map(() => React.createRef());

  useEffect(() => {
    // Auto focus vào ô đầu tiên khi component mount
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && value) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Nếu ô hiện tại trống và không phải ô đầu tiên
        inputRefs[index - 1].current.focus();
      } else {
        // Xóa số hiện tại
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.match(/\d/g);
    
    if (numbers) {
      const newOtp = [...otp];
      numbers.slice(0, 6).forEach((num, index) => {
        newOtp[index] = num;
      });
      setOtp(newOtp);
      // Focus vào ô cuối cùng sau khi paste
      if (inputRefs[5].current) {
        inputRefs[5].current.focus();
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      {Array(6).fill(0).map((_, index) => (
        <TextField
          key={index}
          inputRef={inputRefs[index]}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center' }
          }}
          sx={{ 
            width: '40px',
            '& input': {
              padding: '8px',
              fontSize: '1.2rem'
            }
          }}
        />
      ))}
    </Box>
  );
};

const ForgotPassword = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [username, setusername] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isTimerRunning]);

  const handleSendOTP = async () => {
    if (!username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid username address');
      return;
    }

    try {
      await forgotPassword({ username });
      setStep(2);
      setTimeLeft(180);
      setIsTimerRunning(true);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const resetOtp = () => {
    setOtp(Array(6).fill(''));
    // Focus vào ô đầu tiên sau khi reset
    const firstInput = document.querySelector('input[type="text"]');
    if (firstInput) firstInput.focus();
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    try {
      await verifyPassword({ username, otp: otpString });
      setStep(3);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
      resetOtp(); // Reset OTP khi nhập sai
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await resetPassword({ username, password: newPassword });
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {step === 1 && 'Forgot Password'}
        {step === 2 && 'Enter OTP'}
        {step === 3 && 'Reset Password'}
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {step === 1 && (
          <TextField
            fullWidth
            label="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            margin="normal"
          />
        )}

        {step === 2 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter the OTP sent to your email
            </Typography>
            <OtpInput otp={otp} setOtp={setOtp} />
            <Typography variant="body2" sx={{ mt: 2, color: timeLeft <= 30 ? 'error.main' : 'text.secondary' }}>
              Time remaining: {formatTime(timeLeft)}
            </Typography>
            {error && (
              <Button 
                onClick={resetOtp}
                sx={{ mt: 1 }}
                size="small"
              >
                Clear OTP
              </Button>
            )}
          </Box>
        )}

        {step === 3 && (
          <>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {step === 1 && (
          <Button onClick={handleSendOTP} variant="contained">
            Send OTP
          </Button>
        )}
        {step === 2 && (
          <Button 
            onClick={handleVerifyOTP} 
            variant="contained"
            disabled={timeLeft === 0}
          >
            Verify OTP
          </Button>
        )}
        {step === 3 && (
          <Button onClick={handleResetPassword} variant="contained">
            Reset Password
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword; 