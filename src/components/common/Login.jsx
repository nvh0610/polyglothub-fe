import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import getLPTheme from "./../base/getLPTheme";
// import { useAuth } from "../../hooks/AuthProvider";

export default function Login({ handleLoginDialogClose }) {
  const [mode, setMode] = React.useState(getInitialMode());
  const [loginError, setLoginError] = React.useState(false);
  // const auth = useAuth();

  const LPtheme = createTheme(getLPTheme(mode));
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the registration page
  };

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("mode"));
    return savedMode || "light";
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      username: data.get("username"),
      password: data.get("password"),
    };
    console.log("values", values);
    // auth.loginAction(values);
    navigate("/");

    return;
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
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              margin: 3,
              padding: 5,
              alignSelf: "center",
              width: "100%",
              bgcolor: "rgba(255, 255, 255, 0.3)",
              backgroundSize: "cover",
              borderRadius: "10px",
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography>Tên đăng nhập</Typography>
              <TextField
                required
                fullWidth
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                sx={{
                  mt: 1,
                  mb: 1,
                  boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                  borderRadius: 3,
                }}
              />
              <Typography>Mật khẩu</Typography>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  mt: 1,
                  mb: 1,
                  boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                  borderRadius: 3,
                }}
              />
              <Grid item>
                {loginError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    Tên đăng nhập hoặc mật khẩu không hợp lệ!
                  </div>
                )}
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  backgroundColor: "primary",
                  color: "white",
                }}
              >
                Đăng nhập
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    color="primary"
                    variant="text"
                    sx={{ width: "100%" }}
                    component="button"
                    onClick={handleRegisterClick}
                  >
                    {"Không có tài khoản?"}
                    <strong style={{ margin: "5px" }}>{"  Đăng ký"}</strong>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <CssBaseline />
          </Box>
        </Container>
      </Box>
    </Stack>
  );
}
