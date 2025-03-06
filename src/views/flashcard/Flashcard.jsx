import React from "react";
import { Link } from "react-router-dom";
import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";

import { useState } from "react";
import { Stack, Container, Button, Box, Checkbox, FormControlLabel } from "@mui/material";

const flashcards = [
  {
      "vocabulary_id": 3,
      "word": "sdsdsccccdđddasdasdasdasdáđáasd",
      "meaning": "saschddddd",
      "ipa": "book",
      "type": "nfffffffffffffffff",
      "url": "http",
      "description": "book"
  },
  {
      "vocabulary_id": 7,
      "word": "asdasdasda",
      "meaning": "sasch",
      "ipa": "book",
      "type": "n",
      "url": "http",
      "description": "book"
  },
  {
      "vocabulary_id": 9,
      "word": "aaaaaaaaa",
      "meaning": "sasch",
      "ipa": "book",
      "type": "n",
      "url": "http",
      "description": "book"
  },
  {
      "vocabulary_id": 16,
      "word": "book",
      "meaning": "d",
      "ipa": "1",
      "type": "s",
      "url": "s",
      "description": "a"
  },
  {
      "vocabulary_id": 17,
      "word": "n",
      "meaning": "http",
      "ipa": "sasch",
      "type": "book",
      "url": "sasch",
      "description": "book"
  },
  {
      "vocabulary_id": 19,
      "word": "sasch111",
      "meaning": "sasch",
      "ipa": "book",
      "type": "http",
      "url": "http",
      "description": "qqqqqqqqqqqqqqcccasdasdasd"
  },
  {
      "vocabulary_id": 20,
      "word": "http",
      "meaning": "bookasdasdasdasdasdasd",
      "ipa": "book",
      "type": "sach",
      "url": "book",
      "description": "http"
  },
  {
      "vocabulary_id": 21,
      "word": "asdadasdas",
      "meaning": "asdasd",
      "ipa": "sad",
      "type": "asd",
      "url": "asdasd",
      "description": "asd"
  }
]
export default function Flashcard() {
  const [selectedButton, setSelectedButton] = useState("all");
  const [showWord, setShowWord] = useState(true);
  const [showMeaning, setShowMeaning] = useState(false);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleShowWordChange = (event) => {
    setShowWord(event.target.checked);
    setShowMeaning(!event.target.checked);
  };

  const handleShowMeaningChange = (event) => {
    setShowMeaning(event.target.checked);
    setShowWord(!event.target.checked);
  };

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <AppAppBar name="nvh0610" currentPage="plan" />

      <Container maxWidth="lg">
        <h1>Flashcard</h1>
        <div>
          <Button
            variant={selectedButton === "all" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("all")}
            sx={{ mr: 2, backgroundColor: selectedButton === "all" ? "#25ba25" : "#cf87ff", color: "white" }}
            >
            All Flashcards
          </Button>
          <Button
            variant={selectedButton === "personal" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("personal")}
            sx={{ mr: 2, backgroundColor: selectedButton === "personal" ? "#25ba25" : "#cf87ff", color: "white" }}
            >
            Personal Flashcards
          </Button>
          <Button
            variant={selectedButton === "daily" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("daily")}
            sx={{ mr: 2, backgroundColor: selectedButton === "daily" ? "#25ba25" : "#cf87ff", color: "white" }}
            >
            Daily Flashcards
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={showWord}
                onChange={handleShowWordChange}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  '&.Mui-checked': { color: '#25ba25' }, // Màu xanh lá cây khi được chọn
                }}
              />
            }
            label="Show Word"
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showMeaning}
                onChange={handleShowMeaningChange}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  '&.Mui-checked': { color: '#25ba25' }, // Màu xanh lá cây khi được chọn
                }}
              />
            }
            label="Show Meaning"
          />
        </div>
      </Container>

      <Footer />
    </Stack>
  );
}