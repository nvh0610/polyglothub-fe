import { useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Pagination,
  Container,
  Divider,
  Tooltip,
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const data = {
  vocabularies: [
    {
      id: 1,
      word: "add",
      meaning: "cộng vào, thêm vào",
      ipa: "/æd/",
      type: "v",
      url: "https://dictionary.cambridge.org/dictionary/english/add",
      examples: [
        {
          id: 1,
          sentence: "I added some sugar to my coffee to make it taste better.",
          meaning:
            "Tôi đã thêm một ít đường vào cà phê của mình để nó ngon hơn.",
        },
      ],
    },
    {
      id: 2,
      word: "accept",
      meaning: "nhận, chấp nhận, thừa nhận, công nhận",
      ipa: "/əkˈsept/",
      type: "v",
      url: "https://dictionary.cambridge.org/dictionary/english/accept",
      examples: [
        {
          id: 2,
          sentence:
            "The receptionist accepted the pack age from the courier age from the courier.",
          meaning: "Người tiếp tân đã nhận kiện hàng từ người đưa thư.",
        },
      ],
    },
    {
      id: 3,
      word: "accountant",
      meaning: "(nhân viên) kế toán",
      ipa: "/əˈkaʊntənt/",
      type: "n",
      url: "https://dictionary.cambridge.org/dictionary/english/accountant",
      examples: [
        {
          id: 3,
          sentence:
            "The accountant is responsible for the company's financial records.",
          meaning:
            "Kế toán viên chịu trách nhiệm về hồ sơ tài chính của công ty.",
        },
        {
          id: 3,
          sentence:
            "The accountant is responsible for the company's financial records.",
          meaning:
            "Kế toán viên chịu trách nhiệm về hồ sơ tài chính của công ty.",
        },
      ],
    },
  ],
  pagination: {
    total_page: 100,
    limit: 3,
    page: 1,
  },
};

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
  const [categoryName, setCategoryName] = useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
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
            <TypeSelect type={type} onChange={setType} />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <LimitSelect limit={limit} onChange={setLimit} />
          </Grid>
          <Grid item xs={12} sm={8}>
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
                    {/* Nút ba chấm dọc */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Delete" arrow>
                      <IconButton sx={{ color: "gray" }}>
                        <MoreVertIcon sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </Tooltip>
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
          pagination={data.pagination}
          onPageChange={handleChangePage}
          sx={{ mt: 4 }}
        />
      </Container>
      <Footer />
    </Stack>
  );
}
