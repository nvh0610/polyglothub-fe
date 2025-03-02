import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Container,
  Badge,
} from "@mui/material";
import backgroundImage from "../../assets/category.png";
import Stack from "@mui/material/Stack";
import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import PaginationButtons from "../pagination/pagination";
import { useState } from "react";
import LimitSelect from "../../components/common/LimitSelect";
import SearchBox from "../../components/common/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menu, MenuItem, IconButton } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Category() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null); // Điều khiển menu ba chấm
  const [selectedCategory, setSelectedCategory] = useState(null); // Lưu ID danh mục được chọn
  const [openEditDialog, setOpenEditDialog] = useState(false); // Điều khiển dialog chỉnh sửa
  const [editedCategoryName, setEditedCategoryName] = useState(""); // Lưu tên danh mục chỉnh sửa

  const data = {
    pagination: {
      total_page: 10,
      limit: 10,
      page: 1,
    },
    categories: [
      {
        id: 1,
        name: "toeic user 2",
        created_at: "2025-03-01 13:50:21 +0700 +07",
        updated_at: "2025-03-01 13:50:21 +0700 +07",
      },
      {
        id: 2,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:04 +0700 +07",
        updated_at: "2025-03-01 15:58:04 +0700 +07",
      },
      {
        id: 3,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:06 +0700 +07",
        updated_at: "2025-03-01 15:58:06 +0700 +07",
      },
      {
        id: 4,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:07 +0700 +07",
        updated_at: "2025-03-01 15:58:07 +0700 +07",
      },
      {
        id: 5,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:08 +0700 +07",
        updated_at: "2025-03-01 15:58:08 +0700 +07",
      },
      {
        id: 6,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:09 +0700 +07",
        updated_at: "2025-03-01 15:58:09 +0700 +07",
      },
      {
        id: 7,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:09 +0700 +07",
        updated_at: "2025-03-01 15:58:09 +0700 +07",
      },
      {
        id: 8,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:10 +0700 +07",
        updated_at: "2025-03-01 15:58:10 +0700 +07",
      },
    ],
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleNavigate = (id) => {
    navigate(`/category/${id}/vocabulary`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryName("");
    setError(false); // Reset lỗi khi đóng dialog
  };
  const handleCreateCategory = () => {
    if (categoryName.trim() === "") {
      setError(true); // Hiển thị lỗi
      return;
    }

    console.log("New Category Created:", categoryName);
    setError(false);
    handleCloseDialog();
  };

  const handleOpenMenu = (event, category) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCategory(category);
  };

  // Đóng menu ba chấm
  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedCategory(null);
  };

  // Xử lý xóa danh mục
  const handleDeleteCategory = () => {
    console.log("Deleting category:", selectedCategory?.id);
    setMenuAnchor(null);
    // TODO: Gọi API hoặc cập nhật state để xóa danh mục
  };

  // Mở dialog chỉnh sửa danh mục
  const handleEditCategory = () => {
    setEditedCategoryName(selectedCategory?.name || "");
    setOpenEditDialog(true);
    setMenuAnchor(null);
  };

  // Lưu thay đổi sau khi chỉnh sửa danh mục
  const handleSaveEdit = () => {
    console.log(
      "Updating category:",
      selectedCategory?.id,
      "New Name:",
      editedCategoryName
    );
    setOpenEditDialog(false);
    // TODO: Gọi API hoặc cập nhật state để chỉnh sửa danh mục
  };

  // Đóng dialog chỉnh sửa
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <Stack>
      {/* Sử dụng AppAppBar giống Dashboard */}
      <AppAppBar name="nvh0610" currentPage="category" />

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
          sx={{
            textDecoration: "underline", // Gạch chân
            mt: 2,
            mb: 3,
            color: "#0e3fef",
          }}
        >
          Topic
        </Typography>
        {/* Select Boxes + Search */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={2}>
            <LimitSelect limit={limit} onChange={setLimit} />
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <SearchBox onSearch={handleSearch} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={1}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Badge badgeContent="New" color="error">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
                fullWidth
                startIcon={<AddIcon />}
                sx={{ height: "95%", borderRadius: "8px" }} // Bo góc nút Add
              >
                Add
              </Button>
            </Badge>
          </Grid>

          {/* Dialog Box for New Category */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            sx={{ "& .MuiPaper-root": { borderRadius: "12px" } }} // Bo góc cho Dialog
          >
            <DialogTitle>Create New Category</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setError(false); // Xóa lỗi khi nhập
                }}
                error={error} // Hiển thị lỗi khi error = true
                helperText={error ? "Category name is required!" : ""}
              />
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
            >
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleCreateCategory}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid container spacing={6}>
          {data.categories.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image || backgroundImage}
                  alt={item.name}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h7"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ mb: 1, color: "#0e3fef" }}
                  >
                    {item.name}
                  </Typography>
                  {/* Icon ba chấm ở góc phải */}
                  <IconButton
                    sx={{ position: "absolute", right: 0, top: 0 }}
                    onClick={(event) => handleOpenMenu(event, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  {/* Menu chứa Edit và Delete */}
                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      sx: {
                        boxShadow: 2, // Hiệu ứng đổ bóng
                        backgroundColor: "#F0FFF4",
                      },
                    }}
                  >
                    <MenuItem onClick={handleEditCategory}>
                      <EditIcon sx={{ mr: 1 }} />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleDeleteCategory}
                      sx={{ color: "red" }}
                    >
                      <DeleteIcon sx={{ mr: 1 }} />
                      Delete
                    </MenuItem>
                  </Menu>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: "auto", // Đẩy button xuống đáy
                      fontStyle: "arial",
                    }}
                    onClick={() => handleNavigate(item.id)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* Dialog chỉnh sửa danh mục */}
          <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <PaginationButtons
          pagination={data.pagination}
          onPageChange={handleChangePage}
          sx={{ mt: 4 }}
        />
      </Container>
      <Footer />
    </Stack>
  );
}
