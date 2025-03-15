import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";
import Login from "../../components/common/Login";

import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";
import carImage from "../../assets/logo_transparent.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [accessToken] = useState(localStorage.getItem("access_token"));

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const toggleLoginDialog = () => {
    setOpenLoginDialog(!openLoginDialog);
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/category"); // Chuyển hướng ngay khi có accessToken
    }
  }, [accessToken, navigate]);

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar currentPage="home" login={toggleLoginDialog} />
      <Container>
        {/* Hero Section - thay đổi layout */}
        <Box
          sx={{
            width: "100%",
            minHeight: "calc(65vh - 30px)", // trừ chiều cao header nếu có
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
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Studying is not about time, it's about effort
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Work hard, stay humble, be kind...
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={!accessToken ? toggleLoginDialog : () => {}}
            >
              Sign in
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
            <Box sx={{ width: { lg: "100%", xs: "100%"} }}>
              <img
                src={carImage}
                style={{ maxWidth: "150%", textAlign: "center" }}
                alt="car hero"
              />
            </Box>
          </Box>
        </Box>

        {/* Phần còn lại, ví dụ bảng, footer, v.v. */}
      </Container>
      <Footer />
    </Stack>
  );
}
