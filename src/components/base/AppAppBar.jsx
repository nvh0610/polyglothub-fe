// import * as React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
// import Drawer from "@mui/material/Drawer";
// import MenuIcon from "@mui/icons-material/Menu";
// import Dialog from "@mui/material/Dialog";

// import Login from "../common/Login";
// import AccountMenu from "./AccountMenu";

// import logo from "../../assets/logo.png";
// import { useAuth } from "../../hooks/AuthProvider";

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

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
      </AppBar>
    </div>
  );
}
