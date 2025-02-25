import { Link } from "react-router-dom";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const logoStyle = {
  width: "40px",
  height: "40px",
  cursor: "pointer",
  marginLeft: "10px",
  marginRight: "5px",
};

export default function AppAppBar({ currentPage, login }) {
  // const [openDrawer, setOpenDrawer] = React.useState(false);

  // const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  // const [idToken, setIdToken] = React.useState(
  //   localStorage.getItem("id_token"),
  // );
  // const [accountUser, setAccountUser] = React.useState({});
  // const auth = useAuth();

  // const handleLoginButtonClick = () => {
  //   setOpenLoginDialog(true);
  // };

  // const handleLoginDialogClose = () => {
  //   setOpenLoginDialog(false);
  // };

  // const toggleDrawer = (newOpen) => () => {
  //   setOpenDrawer(newOpen);
  // };

  // React.useEffect(() => {
  //   if (auth.user) {
  //     setAccountUser(auth.user);
  //   }
  // }, [auth.user]);

  const menuItems = [
    { name: "Vocabulary", path: "/vocabulary" },
    { name: "Grammar", path: "/grammar" },
    { name: "Flashcards", path: "/flashcards" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        bgcolor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        top: 0,
      }}
    >
      <Toolbar sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        {/* Logo / Brand name bên trái */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            <span style={{ color: "green" }}>Study</span>
            <span style={{ color: "orange" }}>Words</span>
            <span style={{ color: "blue" }}>.ir</span>
          </Typography>
        </Box>

        {/* Menu chính ở giữa */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              component={Link} // Sử dụng Link của react-router-dom
              to={item.path}   // Đường dẫn tương ứng
              sx={{
                color: "green",
                fontSize: "1.2rem",
                textTransform: "none",
                transition: "transform 0.2s, text-decoration 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Nút Log in bên phải */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            component={Link}
            to="/login" // Nếu có trang login
          >
            Log in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
