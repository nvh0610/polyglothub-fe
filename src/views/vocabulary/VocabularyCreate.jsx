import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
    fetchVocabularies,
    createVocabulary,
  } from "./api";

const CreateVocabularyDialog = ({
    open,
    onClose,
    setVocabularies,
    word,
    setWord,
    ipa,
    setIpa,
    type,
    setType,
    meaning,
    setMeaning,
    description,
    setDescription,
    url,
    setUrl,
    examples,
    setExamples,
    error,
    setError,
    id,
    limit,
    searchTerm,
    page,
    data_type,
  }) => {

  const handleExampleChange = (index, field, value) => {
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

  const handleAddExample = () => {
    setExamples([...examples, { sentence: "", meaning: "" }]);
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
            data_type,
            category_id: id,
          });
          setVocabularies(updatedData);
          onClose();
        }
      } catch (error) {
        console.error("Failed to create vocabulary", error);
      }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ "& .MuiPaper-root": { borderRadius: "12px" } }}>
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
                onChange={(e) => handleExampleChange(index, "sentence", e.target.value)}
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
                onChange={(e) => handleExampleChange(index, "meaning", e.target.value)}
                error={error}
                helperText={error ? "Meaning is required!" : ""}
                placeholder="Meaning of the sentence"
              />
            </Grid>
            {examples.length > 1 && (
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemoveExample(index)} color="error">
                  <RemoveIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Button onClick={handleAddExample} color="#1976d2" startIcon={<AddIcon />} sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ color: "#1976d2" }}>
            Add Example
          </Typography>
        </Button>
      </DialogContent>
      <DialogActions sx={{ px: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateVocabulary} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVocabularyDialog;