import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Avatar, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;
const navItems = [
  { label: "Category", path: "/category" },
  { label: "Grammar", path: "/grammar" },
  { label: "Flashcard", path: "/flashcard" },
  { label: "Dashboard", path: "/dashboard" },
];

function AppAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      axios
        .get("http://localhost:8000/api/user/me", {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    handleMenuClose();
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PolyglotHub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#aa56ff" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: "#FFFFFF", fontSize: "1.5rem" }}>
              PolyglotHub
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem"}}>
              {navItems.map((item) => (
                <Button key={item.label} onClick={() => handleNavigation(item.path)} sx={{ color: "#fff", fontSize: "1rem" }}>
                  {item.label}
                </Button>
              ))}
              {user && (
                <>
                  <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                    <Avatar>{user.fullname.charAt(0).toUpperCase()}</Avatar>
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem>
                      <EmailIcon sx={{ mr: 1 }} /> Email: {user.username}
                    </MenuItem>
                    <MenuItem>
                      <PersonIcon sx={{ mr: 1 }} /> Name: {user.fullname}
                    </MenuItem>
                    <MenuItem>
                      <AdminPanelSettingsIcon sx={{ mr: 1 }} /> Role: {user.role}
                    </MenuItem>
                    <Divider sx={{ my: 1, opacity: 0.5 }} />
                    <MenuItem>
                      <LockIcon sx={{ mr: 1 }} /> Change Password
                    </MenuItem>
                    <Divider sx={{ my: 1, opacity: 0.5 }} />
                    <MenuItem onClick={handleLogout}>
                      <ExitToAppIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer container={window !== undefined ? () => window().document.body : undefined} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }}>
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

AppAppBar.propTypes = {
  window: PropTypes.func,
};

export default AppAppBar;
