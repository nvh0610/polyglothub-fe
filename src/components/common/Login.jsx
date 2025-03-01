import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (isSignUp) {
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(isSignUp ? "Sign Up data" : "Sign In data", formData);
      alert(isSignUp ? "Sign Up Successful!" : "Sign In Successful!");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box id="hero" sx={{ width: "100%" }}>
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CssBaseline />
          <Box
            sx={{
              margin: 3,
              padding: 5,
              width: "100%",
              bgcolor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" color="red" fontWeight="bold" sx={{ mb: 1 }}>
              {isSignUp ? "SIGN UP" : "SIGN IN"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography>Email</Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  mt: 1,
                  mb: 1,
                  boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.2)",
                  borderRadius: 3,
                }}
              />
              <Typography>Password</Typography>
              <TextField
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  mt: 1,
                  mb: 1,
                  boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.2)",
                  borderRadius: 3,
                }}
              />
              {isSignUp && (
                <>
                  <Typography>Confirm Password</Typography>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={{
                      mt: 1,
                      mb: 1,
                      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.2)",
                      borderRadius: 3,
                    }}
                  />
                </>
              )}
              {!isSignUp && (
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  backgroundColor: "#aa56ff",
                  color: "white",
                }}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    color="primary"
                    variant="text"
                    sx={{ width: "100%" }}
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "NO ACCOUNT? SIGN UP"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </Stack>
  );
}
