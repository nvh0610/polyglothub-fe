import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ForgotPassword from './ForgotPassword';

export default function AuthForm() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.username.trim()) {
      newErrors.username = "Email is required";
    } else if (!emailRegex.test(formData.username)) {
      newErrors.username = "Please enter a valid email address";
    }

    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (isSignUp) {
      if (!formData.fullname.trim()) newErrors.fullname = "Full Name is required";
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const url = isSignUp
        ? "http://localhost:8000/api/auth/"
        : "http://localhost:8000/api/auth/login";

      const payload = isSignUp
        ? { fullname: formData.fullname, username: formData.username, password: formData.password, role: "user" }
        : { username: formData.username, password: formData.password };

      const response = await axios.post(url, payload);

      if (response.status === 200) {
        if (isSignUp) {
          setSuccessMessage("Tạo tài khoản thành công! Vui lòng đăng nhập.");
          setOpenSnackbar(true);
          setIsSignUp(false);

          setFormData({
            username: formData.username,
            password: formData.password,
            confirmPassword: "",
            fullname: "",
          });
        } else {
          localStorage.setItem("access_token", response.data.data.access_token);
          navigate("/category");
        }
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.msg || "Có lỗi xảy ra, vui lòng thử lại.";
        setErrors({ general: errorMessage });
      } else {
        setErrors({ general: "Không thể kết nối đến máy chủ, vui lòng thử lại sau." });
      }
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  return (
    <Stack sx={{ background: "url(/bgr.png)", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}>
      <Box id="hero" sx={{ width: "100%" }}>
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CssBaseline />
          <Box sx={{
            margin: 3,
            padding: 5,
            width: "100%",
            bgcolor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Typography component="h1" variant="h5" color="red" fontWeight="bold" sx={{ mb: 1 }}>
              {isSignUp ? "SIGN UP" : "SIGN IN"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField label="Email" fullWidth name="username" value={formData.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} sx={{ mt: 1, mb: 1, borderRadius: 3 }} />
              <TextField label="Password" fullWidth name="password" type="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} sx={{ mt: 1, mb: 1, borderRadius: 3 }} />
              {isSignUp && (
                <>
                  <TextField label="Confirm Password" fullWidth name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} sx={{ mt: 1, mb: 1, borderRadius: 3 }} />
                  <TextField label="Full Name" fullWidth name="fullname" value={formData.fullname} onChange={handleChange} error={!!errors.fullname} helperText={errors.fullname} sx={{ mt: 1, mb: 1, borderRadius: 3 }} />
                </>
              )}
              {errors.general && <Typography color="error" sx={{ mt: 1 }}>{errors.general}</Typography>}
              {!isSignUp && (
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleForgotPassword}>Forgot password?</Link>
                </Grid>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1, backgroundColor: "#aa56ff", color: "white" }}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button color="primary" variant="text" sx={{ width: "100%" }} onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "NO ACCOUNT? SIGN UP"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <ForgotPassword 
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      />
    </Stack>
  );
}
