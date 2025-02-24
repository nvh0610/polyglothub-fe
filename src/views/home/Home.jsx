import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";
import Login from "../../components/common/Login";

import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";
import carImage from "../../assets/car.png";

export default function Home() {
  const [accessToken] = useState(localStorage.getItem("access_token"));
  const [role, setRole] = useState();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const toggleLoginDialog = () => {
    setOpenLoginDialog(!openLoginDialog);
  };

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`http://localhost:8080/api/user/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setRole(response.data.authorities);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar currentPage="home" login={toggleLoginDialog} />

      {/* Hero Section - thay đổi layout */}
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)", // trừ chiều cao header nếu có
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        {/* Phần text (title, subtitle, button) */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 4, md: 0 },
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Maximize Mobile Performance
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Develop, grow and optimize your digital business...
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={!accessToken ? toggleLoginDialog : () => {}}
          >
            Đăng nhập
          </Button>
          <Dialog open={openLoginDialog} onClose={toggleLoginDialog}>
            <Login handleLoginDialogClose={toggleLoginDialog} />
          </Dialog>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: { lg: "100%", xs: "80%" } }}>
            <img
              src={carImage}
              style={{ maxWidth: "100%", textAlign: "center" }}
              alt="car hero"
            />
          </Box>
        </Box>
      </Box>

      {/* Phần còn lại, ví dụ bảng, footer, v.v. */}
      <Footer />
    </Stack>
  );
}
