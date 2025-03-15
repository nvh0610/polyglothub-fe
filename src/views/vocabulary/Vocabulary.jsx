import { useParams, useLocation } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchVocabularies,
} from "./api";

import CreateVocabularyDialog from "./VocabularyCreate";
import UpdateVocabularyDialog from "./VocabularyUpdate";
import DeleteVocabularyDialog from './VocabularyDelete';


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
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [data_type, setDataType] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null); // Điều khiển menu ba chấm
  const [selectedVocabulary, setSelectedVocabulary] = useState(null); // Lưu ID danh mục được chọn
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [meaning, setMeaning] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [examples, setExamples] = useState([{ sentence: "", meaning: "" }]); // Danh sách ví dụ (ban đầu có 1 ô trống)
  const [data, setVocabularies] = useState({
    vocabularies: [],
    pagination: {},
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Thêm state cho delete dialog
  const categoryName = location.state?.categoryName || 'Default Category Name';

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
        data_type,
        category_id: id,
      });
      setVocabularies(result);
    };

    getVocabularies();
  }, [limit, searchTerm, page, data_type, id]); // Gọi lại API khi limit hoặc searchTerm thay đổi

  const handleChangeType = (newType) => {
    setDataType(newType);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpenDialog = () => {
    // Reset các state liên quan đến từ vựng
    setWord("");
    setIpa("");
    setMeaning("");
    setDescription("");
    setUrl("");
    setExamples([{ sentence: "", meaning: "" }]);
    setError(false);

    setOpenDialog(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(false); // Reset lỗi khi đóng dialog
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    setMenuAnchor(null); // Close menu
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedVocabulary(null);
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedVocabulary(null); // Reset lại dữ liệu khi đóng hộp thoại
    handleCloseMenu();
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
        <h1>{categoryName}</h1>
        {/* Select Boxes + Search */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={1.5}>
            <TypeSelect data_type={data_type} onChange={handleChangeType} />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <LimitSelect limit={limit} onChange={handleLimitChange} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <SearchBox onSearch={handleSearch} />
          </Grid>
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
          {openDialog && (
            <CreateVocabularyDialog
              open={openDialog}
              onClose={handleCloseDialog}
              setVocabularies={setVocabularies}
              word={word}
              setWord={setWord}
              ipa={ipa}
              setIpa={setIpa}
              type={type}
              setType={setType}
              meaning={meaning}
              setMeaning={setMeaning}
              description={description}
              setDescription={setDescription}
              url={url}
              setUrl={setUrl}
              examples={examples}
              setExamples={setExamples}
              error={error}
              setError={setError}
              id={id}
              limit={limit}
              searchTerm={searchTerm}
              page={page}
              data_type={data_type}
            />
          )}
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
                <Grid container alignItems="center">
      <Grid item xs>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: "clamp(1rem, 1.7rem, 2rem)",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              color: "#333",
            }}
          >
            {vocab.word}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "clamp(1rem, 1.5rem, 1.8rem)",
              color: "red",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {vocab.ipa}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", color: "gray" }}>
            <Box
              sx={{
                display: "inline-block",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "white",
                backgroundColor:
                  vocab.type === "n"
                    ? "#2196F3"
                    : vocab.type === "adj"
                      ? "#E91E63"
                      : vocab.type === "adv"
                        ? "#FF9800"
                        : vocab.type === "v"
                          ? "#4CAF50"
                          : vocab.type === "prep"
                            ? "#9C27B0"
                            : vocab.type === "conj"
                              ? "#FFC107"
                              : "#00ffff",
              }}
            >
              {vocab.type}
            </Box>
          </Typography>

          <IconButton
            sx={{ color: "#007bff" }}
            onClick={() => speakWord(vocab.word)}
          >
            <VolumeUpIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>

          <a
            href={vocab.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton sx={{ color: "#007bff" }}>
              <OpenInNewIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </a>
        </Stack>
      </Grid>

      <Grid item>
        <IconButton
          onClick={(event) => handleOpenMenu(event, vocab)}
        >
          <MoreVertIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: { boxShadow: 2, backgroundColor: "#F0FFF4" },
          }}
        >
          <MenuItem onClick={() => handleOpenUpdateDialog(vocab)}>
            <EditIcon sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => handleOpenDeleteDialog()}
            sx={{ color: "red" }}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>

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
                      <Typography variant="body1" sx={{ fontSize: "1.3rem", overflowWrap: "break-word", whiteSpace: "normal" }}>
                        {vocab.meaning}
                      </Typography>{" "}
                    </li>
                  </ul>

                  {/* Gạch phân cách */}
                  <Divider sx={{ my: 1, opacity: 0.5 }} />

                  {/* Phần giữa */}
                  <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>


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
                      <Typography variant="body1" sx={{ fontSize: "1.3rem", overflowWrap: "break-word", whiteSpace: "normal" }}>
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
                        <Typography variant="body1" sx={{ fontSize: "1.3rem", overflowWrap: "break-word", whiteSpace: "normal" }}>
                          {example.sentence}
                          <IconButton
                            sx={{ color: "#007bff", marginLeft: "0.5em" }}
                            onClick={() => speakWord(example.sentence)}
                          >
                            <VolumeUpIcon sx={{ fontSize: "1.5rem" }} />
                          </IconButton>
                        </Typography>
                        <Typography variant="body1" sx={{ fontStyle: "italic", fontSize: "1.1rem", overflowWrap: "break-word", whiteSpace: "normal" }}>

                          ({example.meaning})
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {<UpdateVocabularyDialog
            open={openUpdateDialog}
            onClose={handleCloseUpdateDialog}
            selectedVocabulary={selectedVocabulary}
            setSelectedVocabulary={setSelectedVocabulary}
            setVocabularies={setVocabularies}
            id={id}
            limit={limit}
            searchTerm={searchTerm}
            page={page}
            data_type={data_type}
            error={error}
            setError={setError}
          />
          }
          {<DeleteVocabularyDialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            selectedVocabulary={selectedVocabulary}
            setVocabularies={setVocabularies}
            limit={limit}
            searchTerm={searchTerm}
            page={page}
            type={type}
          />}
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
