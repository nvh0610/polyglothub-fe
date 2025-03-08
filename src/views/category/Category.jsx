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
import { useState, useEffect } from "react";
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
import { fetchCategories, createCategory, deleteCategory, updateCategory } from "./api"; // Import hàm fetch

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

  const [data, setCategories] = useState({ categories: [], pagination: {} });

  useEffect(() => {
    const getCategories = async () => {
      const result = await fetchCategories({ limit, name: searchTerm, page });
      setCategories(result);
    };

    getCategories();
  }, [limit, searchTerm, page]); // Gọi lại API khi limit hoặc searchTerm thay đổi

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleNavigate = (id) => {
    navigate(`/category/${id}/vocabulary`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryName("");
    setError(false); // Reset lỗi khi đóng dialog
  };
  const handleCreateCategory = async () => {
    if (categoryName.trim() === "") {
      setError(true);
      return;
    }
  
    try {
      const newCategory = await createCategory(categoryName);
  
      if (newCategory) {
        console.log("Category Created Successfully:", newCategory);
  
        // Gọi lại API để cập nhật danh sách category
        const updatedData = await fetchCategories({ limit, name: searchTerm, page });
        setCategories(updatedData);
        
        handleCloseDialog(); // Đóng dialog sau khi tạo thành công
      } else {
        console.error("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
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
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
  
    console.log("Deleting category:", selectedCategory.id);
    setMenuAnchor(null); // Đóng menu
  
    try {
      const isDeleted = await deleteCategory(selectedCategory.id);
  
      if (isDeleted) {
        console.log("Category deleted successfully.");
  
        // Gọi lại API để cập nhật danh sách category
        const updatedData = await fetchCategories({ limit, name: searchTerm, page });
        setCategories(updatedData);
      } else {
        console.error("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  // Mở dialog chỉnh sửa danh mục
  const handleEditCategory = () => {
    setEditedCategoryName(selectedCategory?.name || "");
    setOpenEditDialog(true);
    setMenuAnchor(null);
  };

  // Lưu thay đổi sau khi chỉnh sửa danh mục
  const handleSaveEdit = async () => {
    if (!selectedCategory || !editedCategoryName.trim()) return;
  
    console.log("Updating category:", selectedCategory.id, "New Name:", editedCategoryName);
  
    try {
      const updatedCategory = await updateCategory(selectedCategory.id, editedCategoryName);
  
      if (updatedCategory) {
        console.log("Category updated successfully.");
  
        // Gọi lại API để cập nhật danh sách category
        const updatedData = await fetchCategories({ limit, name: searchTerm, page });
        setCategories(updatedData);
      } else {
        console.error("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setOpenEditDialog(false); // Đóng dialog
    }
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
            <LimitSelect limit={limit} onChange={handleLimitChange} />
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

                  {/* Thêm created_by */}
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      right: 8,
                      bottom: 8,
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      opacity: 0.8
                    }}
                  >
                    Created by: {item.user_id <= 0 ? 'Admin' : 'Me'}
                  </Typography>

                  {/* Menu chứa Edit và Delete */}
                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      sx: {
                        boxShadow: 2,
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
                      mt: "auto",
                      fontStyle: "arial",
                      mb: 1, // Thêm margin bottom để không đè lên created by
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
          pagination={{ ...data.pagination, page }} // Luôn cập nhật page từ state
          onPageChange={handleChangePage}
          sx={{ mt: 4 }}
        />
      </Container>
      <Footer />
    </Stack>
  );
}
