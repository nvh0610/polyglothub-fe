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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { changePassword } from "./api";
import { HOST_API } from "../../constants/PathUri";


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
  const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  

  React.useEffect(() => {
    // Đầu tiên kiểm tra xem có dữ liệu người dùng trong localStorage không
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
    
    // Nếu không có dữ liệu trong localStorage hoặc có lỗi khi parse, thì gọi API
    if (!user) {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        axios
          .get(`${HOST_API}/user/me`, {
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            setUser(response.data.data);
            // Lưu thông tin người dùng vào localStorage để sử dụng sau này
            localStorage.setItem("user_data", JSON.stringify(response.data.data));
          })
          .catch((error) => {
            console.error("Error fetching user data", error);
          });
      }
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
    localStorage.removeItem("user_data"); // Xóa cả dữ liệu người dùng khi đăng xuất
    setUser(null);
    handleMenuClose();
    navigate("/");
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError(''); // Clear error when user types
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
    setError('');
    setSuccess('');
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleSubmitPassword = async () => {
    // Validate passwords
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      await changePassword(passwordForm);
      
      setSuccess('Password changed successfully');
      setTimeout(() => {
        handleClosePasswordDialog();
      }, 1500);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again');
      }
    }
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
                    <MenuItem onClick={handleOpenPasswordDialog}>
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

      {/* Password Change Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <TextField
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            value={passwordForm.oldPassword}
            onChange={handlePasswordChange('oldPassword')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={passwordForm.newPassword}
            onChange={handlePasswordChange('newPassword')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange('confirmPassword')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button onClick={handleSubmitPassword} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

AppAppBar.propTypes = {
  window: PropTypes.func,
};

export default AppAppBar;
