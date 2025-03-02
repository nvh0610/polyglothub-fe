import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
  Divider,
  Badge,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";
import PaginationButtons from "../pagination/pagination";
import TypeSelect from "../../components/common/TypeSelect";
import LimitSelect from "../../components/common/LimitSelect";
import SearchBox from "../../components/common/Search";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menu, MenuItem } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchVocabularies, deleteVocabulary, createVocabulary } from "./api";

const speakWord = (word) => {
  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.voice =
    synth.getVoices().find((v) => v.lang === "en-US") || synth.getVoices()[0];
  utterance.rate = 0.8;

  synth.speak(utterance);
};

export default function Vocabulary() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null); // Điều khiển menu ba chấm
  const [selectedVocabulary, setSelectedVocabulary] = useState(null); // Lưu ID danh mục được chọn

  const [data, setVocabularies] = useState({
    vocabularies: [],
    pagination: {},
  });

  const handleOpenMenu = (event, vocabulary) => {
    setMenuAnchor(event.currentTarget);
    setSelectedVocabulary(vocabulary);
  };

  // Đóng menu ba chấm
  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedVocabulary(null);
  };

  useEffect(() => {
    const getVocabularies = async () => {
      const result = await fetchVocabularies({
        limit,
        word: searchTerm,
        page,
        type,
        category_id: id,
      });
      setVocabularies(result);
    };

    getVocabularies();
  }, [limit, searchTerm, page, type, id]); // Gọi lại API khi limit hoặc searchTerm thay đổi

  const handleChangeType = (newType) => {
    setType(newType);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(false); // Reset lỗi khi đóng dialog
  };

  const handleDeleteVocabulary = async () => {
    if (!selectedVocabulary) return;

    console.log("Deleting vocabulary:", selectedVocabulary.id);
    setMenuAnchor(null); // Đóng menu

    try {
      const isDeleted = await deleteVocabulary(selectedVocabulary.id);

      if (isDeleted) {
        console.log("Vocabulary deleted successfully.");

        // Gọi lại API để cập nhật danh sách category
        const updatedData = await fetchVocabularies({
          limit,
          word: searchTerm,
          page,
          type,
          category_id: id,
        });
        setVocabularies(updatedData);
      } else {
        console.error("Failed to delete vocabulary.");
      }
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
    }
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editWord, setEditWord] = useState("");
  const [editIpa, setEditIpa] = useState("");
  const [editType, setEditType] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editId, setEditId] = useState(null);

  const handleOpenEditDialog = (vocab) => {
    setEditWord(vocab.word);
    setEditIpa(vocab.ipa);
    setEditType(vocab.type);
    setEditMeaning(vocab.meaning);
    setEditDescription(vocab.description);
    setEditUrl(vocab.url);
    setEditId(vocab.id);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditVocabulary = () => {
    // Gửi dữ liệu update lên API
    console.log("Updating Word:", editWord);
    setOpenEditDialog(false);
  };

  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [meaning, setMeaning] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [examples, setExamples] = useState([{ sentence: "", meaning: "" }]); // Danh sách ví dụ (ban đầu có 1 ô trống)

  const handleAddExample = () => {
    setExamples([...examples, { sentence: "", meaning: "" }]); // Thêm 1 example mới
  };

  const handleExampleChange = (index, field, value) => {
    console.log("handleExampleChange called", index, field, value);

    setExamples((prevExamples) => {
      if (prevExamples[index]?.[field] === value) return prevExamples;

      const newExamples = [...prevExamples];
      newExamples[index] = { ...newExamples[index], [field]: value };
      return newExamples;
    });
  };

  const handleRemoveExample = (index) => {
    if (examples.length > 1) {
      setExamples((prevExamples) => prevExamples.filter((_, i) => i !== index));
    }
  };

  const handleCreateVocabulary = async () => {
    if (!word.trim() || !meaning.trim() || !ipa.trim() || !type.trim()) {
      setError(true);
      return;
    }

    setError(false);

    const payload = {
      word,
      meaning,
      ipa,
      type,
      url,
      description,
      category_id: parseInt(id, 10), // Chuyển id sang số nguyên
      examples: examples.filter(
        (ex) => ex.sentence.trim() && ex.meaning.trim()
      ), // Lọc các example rỗng
    };

    try {
      const result = await createVocabulary(payload);
      if (result) {
        console.log("Vocabulary created successfully", result);
        const updatedData = await fetchVocabularies({
          limit,
          word: searchTerm,
          page,
          type,
          category_id: id,
        });
        setVocabularies(updatedData);
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Failed to create vocabulary", error);
    }
  };

  const renderAddButton = () => (
    <>
      <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "stretch" }}>
        <Badge badgeContent="New" color="error">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            fullWidth
            startIcon={<AddIcon />}
            sx={{ height: "95%", borderRadius: "8px" }}
          >
            Add
          </Button>
        </Badge>
      </Grid>

      {/* Dialog Box for New Word */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ "& .MuiPaper-root": { borderRadius: "12px" } }}
      >
        <DialogTitle>Create New Vocabulary</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Word"
            variant="outlined"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            error={error}
            helperText={error ? "Word is required!" : ""}
          />
          <TextField
            fullWidth
            label="Ipa"
            variant="outlined"
            value={ipa}
            onChange={(e) => setIpa(e.target.value)}
            error={error}
            helperText={error ? "Ipa is required!" : ""}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Type"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
            error={error}
            helperText={error ? "Type is required!" : ""}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Meaning"
            variant="outlined"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            error={error}
            helperText={error ? "Meaning is required!" : ""}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={error}
            helperText={error ? "Description is required!" : ""}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Url"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mt: 2 }}
          />
          {/* Examples List */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Examples:
          </Typography>
          {examples.map((example, index) => (
            <Grid container spacing={1} key={index} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Sentence"
                  value={example.sentence}
                  onChange={(e) =>
                    handleExampleChange(index, "sentence", e.target.value)
                  }
                  error={error}
                  helperText={error ? "Sentence is required!" : ""}
                  placeholder="Example sentence"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Meaning"
                  value={example.meaning}
                  onChange={(e) =>
                    handleExampleChange(index, "meaning", e.target.value)
                  }
                  error={error}
                  helperText={error ? "Meaning is required!" : ""}
                  placeholder="Meaning of the sentence"
                />
              </Grid>

              {/* Chỉ hiển thị nút xóa nếu có hơn 1 ô */}
              {examples.length > 1 && (
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => handleRemoveExample(index)}
                    color="error"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}

          {/* Nút thêm Example */}
          <Button
            onClick={handleAddExample}
            color="#1976d2"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            <Typography variant="body1" sx={{ color: "#1976d2" }}>
              Add Example
            </Typography>
          </Button>
        </DialogContent>

        <DialogActions sx={{ px: 2 }}>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateVocabulary}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  const EditDialog = ({
    open,
    handleClose,
    editWord,
    setEditWord,
    editIpa,
    setEditIpa,
    editType,
    setEditType,
    editMeaning,
    setEditMeaning,
    editDescription,
    setEditDescription,
    editUrl,
    setEditUrl,
    handleEditVocabulary,
  }) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Vocabulary</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Word"
            variant="outlined"
            value={editWord}
            onChange={(e) => setEditWord(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Ipa"
            variant="outlined"
            value={editIpa}
            onChange={(e) => setEditIpa(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Type"
            variant="outlined"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Meaning"
            variant="outlined"
            value={editMeaning}
            onChange={(e) => setEditMeaning(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Url"
            variant="outlined"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 2 }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEditVocabulary}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar name="nvh0610" currentPage="plan" />
      <Container maxWidth="lg">
        <h1>Vocabulary List</h1>
        {/* Select Boxes + Search */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={1.5}>
            <TypeSelect type={type} onChange={handleChangeType} />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <LimitSelect limit={limit} onChange={handleLimitChange} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <SearchBox onSearch={handleSearch} />
          </Grid>
          {renderAddButton()}
        </Grid>
        <Grid container spacing={3}>
          {data.vocabularies.map((vocab) => (
            <Grid item xs={12} sm={6} key={vocab.id} sx={{ display: "flex" }}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  {/* Phần trên */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* Từ vựng (chữ to, đậm) */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.7rem",
                        color: "#333",
                      }}
                    >
                      {vocab.word}
                    </Typography>

                    {/* IPA + Loại từ (chữ nhỏ hơn, màu nhạt hơn) */}
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "1.5rem", color: "red" }}
                    >
                      {vocab.ipa}
                    </Typography>

                    {/* Loại từ (chữ nhỏ hơn, màu nhạt hơn) */}
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "1.2rem", color: "gray" }}
                    >
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5, // padding ngang
                          py: 0.5, // padding dọc
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          color: "white",
                          backgroundColor:
                            vocab.type === "n"
                              ? "#2196F3" // xanh nước biển
                              : vocab.type === "adj"
                              ? "#E91E63" // hồng
                              : vocab.type === "adv"
                              ? "#FF9800" // cam
                              : vocab.type === "v"
                              ? "#4CAF50" // xanh lá cây
                              : vocab.type === "prep"
                              ? "#9C27B0" // tốt mâu
                              : vocab.type === "conj"
                              ? "#FFC107" // xanh lạc
                              : "#00ffff",
                        }}
                      >
                        {vocab.type}
                      </Box>
                    </Typography>

                    {/* Nút phát âm */}
                    <IconButton
                      sx={{ color: "#007bff" }}
                      onClick={() => speakWord(vocab.word)}
                    >
                      <VolumeUpIcon sx={{ fontSize: "1.5rem" }} />{" "}
                      {/* Cách 2: Tùy chỉnh kích thước */}
                    </IconButton>
                    {/* Link học tập */}
                    <a
                      href={vocab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton sx={{ color: "#007bff" }}>
                        <OpenInNewIcon sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </a>
                    {/* Nút ba chấm */}
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      onClick={(event) => handleOpenMenu(event, vocab)}
                    >
                      <MoreVertIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>

                    {/* Menu Edit/Delete */}
                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        sx: { boxShadow: 2, backgroundColor: "#F0FFF4" },
                      }}
                    >
                      <MenuItem onClick={() => handleOpenEditDialog(vocab)}>
                        <EditIcon sx={{ mr: 1 }} />
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={handleDeleteVocabulary}
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon sx={{ mr: 1 }} />
                        Delete
                      </MenuItem>
                    </Menu>
                    {/* Hộp thoại chỉnh sửa */}
                    <EditDialog
                      open={openEditDialog}
                      handleClose={handleCloseEditDialog}
                      editWord={editWord}
                      setEditWord={setEditWord}
                      editIpa={editIpa}
                      setEditIpa={setEditIpa}
                      editType={editType}
                      setEditType={setEditType}
                      editMeaning={editMeaning}
                      setEditMeaning={setEditMeaning}
                      editDescription={editDescription}
                      setEditDescription={setEditDescription}
                      editUrl={editUrl}
                      setEditUrl={setEditUrl}
                      handleEditVocabulary={handleEditVocabulary}
                    />
                  </Stack>

                  {/* Gạch phân cách */}
                  <Divider sx={{ my: 1, opacity: 0.5 }} />

                  {/* Phần giữa */}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                  >
                    Meaning:
                  </Typography>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.5em",
                      marginLeft: "1.5em",
                    }}
                  >
                    <li>
                      <Typography variant="body1" sx={{ fontSize: "1.3rem" }}>
                        {vocab.meaning}
                      </Typography>{" "}
                    </li>
                  </ul>

                  {/* Gạch phân cách */}
                  <Divider sx={{ my: 1, opacity: 0.5 }} />

                  {/* Phần giữa */}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                  >
                    Description:
                  </Typography>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.5em",
                      marginLeft: "1.5em",
                    }}
                  >
                    <li>
                      <Typography variant="body1" sx={{ fontSize: "1.3rem" }}>
                        {vocab.description}
                      </Typography>{" "}
                    </li>
                  </ul>
                  {/* Gạch phân cách */}
                  <Divider sx={{ my: 1, opacity: 0.5 }} />

                  {/* Phần dưới */}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                  >
                    Examples:
                  </Typography>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.2em",
                      marginLeft: "1.5em",
                    }}
                  >
                    {vocab.examples.map((example, index) => (
                      <li key={index} style={{ marginBottom: "0.5em" }}>
                        <Typography variant="body1" sx={{ fontSize: "1.3rem" }}>
                          {example.sentence}
                          <IconButton
                            sx={{ color: "#007bff", marginLeft: "0.5em" }}
                            onClick={() => speakWord(example.sentence)}
                          >
                            <VolumeUpIcon sx={{ fontSize: "1.5rem" }} />
                          </IconButton>
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontStyle: "italic", fontSize: "1.1rem" }}
                        >
                          ({example.meaning})
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
