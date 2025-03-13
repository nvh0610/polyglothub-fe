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
    editVocabulary,
  } from "./api";


  const UpdateVocabularyDialog = ({
    open,
  onClose,
  selectedVocabulary,
  setSelectedVocabulary,
  setVocabularies,
  limit,
  searchTerm,
  page,
  data_type,
  id,
  error,
    setError,
  }) => {
  const handleUpdateExample = (index, field, value) => {
    setSelectedVocabulary((prev) => {
      const newExamples = [...prev.examples];
      newExamples[index] = { ...newExamples[index], [field]: value };
      return { ...prev, examples: newExamples };
    });
  };

  const handleAddExample = () => {
    setSelectedVocabulary((prev) => ({
      ...prev,
      examples: [...(prev?.examples || []), { sentence: "", meaning: "" }],
    }));
  };

  const handleRemoveExample = (index) => {
    setSelectedVocabulary((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateVocabulary = async () => {
    if (
      !selectedVocabulary.word.trim() ||
      !selectedVocabulary.meaning.trim() ||
      !selectedVocabulary.ipa.trim()
    ) {
      setError(true);
      return;
    }

    selectedVocabulary.category_id = parseInt(id, 10); // Chuyển id sang số nguyên

    setError(false);

    const payload = {
      ...selectedVocabulary,
      examples: selectedVocabulary.examples
        .filter((ex) => ex.sentence.trim() && ex.meaning.trim())
        .map((ex) => ({
          id: ex.id || null, // Giữ ID của example nếu có, nếu không thì gửi null
          sentence: ex.sentence,
          meaning: ex.meaning,
        })),
    };

    console.log("Updating vocabulary:", payload);

    try {
      const result = await editVocabulary(selectedVocabulary.id, payload); // Gửi API update
      if (result) {
        console.log("Vocabulary updated successfully", result);
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
      console.error("Failed to update vocabulary", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Vocabulary</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Word"
          variant="outlined"
          value={selectedVocabulary?.word || ""}
          onChange={(e) =>
            setSelectedVocabulary({
              ...selectedVocabulary,
              word: e.target.value,
            })
          }
          error={error}
          helperText={error ? "Word is required!" : ""}
        />
        <TextField
          fullWidth
          label="Ipa"
          variant="outlined"
          value={selectedVocabulary?.ipa || ""}
          onChange={(e) =>
            setSelectedVocabulary({
              ...selectedVocabulary,
              ipa: e.target.value,
            })
          }
          error={error}
          helperText={error ? "Ipa is required!" : ""}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Type"
          variant="outlined"
          value={selectedVocabulary?.type || ""}
          onChange={(e) =>
            setSelectedVocabulary({
              ...selectedVocabulary,
              type: e.target.value,
            })
          }
          error={error}
          helperText={error ? "Type is required!" : ""}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Meaning"
          variant="outlined"
          value={selectedVocabulary?.meaning || ""}
          onChange={(e) =>
            setSelectedVocabulary({
              ...selectedVocabulary,
              meaning: e.target.value,
            })
          }
          error={error}
          helperText={error ? "Meaning is required!" : ""}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={selectedVocabulary?.description || ""}
          onChange={(e) =>
            setSelectedVocabulary({
              ...selectedVocabulary,
              description: e.target.value,
            })
          }
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Url"
          variant="outlined"
          value={selectedVocabulary?.url || ""}
          onChange={(e) =>
            setSelectedVocabulary({
              ...selectedVocabulary,
              url: e.target.value,
            })
          }
          sx={{ mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Examples:
        </Typography>
        {selectedVocabulary?.examples.map((example, index) => (
          <Grid container spacing={1} key={index} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                label="Sentence"
                value={example.sentence}
                onChange={(e) =>
                  handleUpdateExample(index, "sentence", e.target.value)
                }
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
                  handleUpdateExample(index, "meaning", e.target.value)
                }
                placeholder="Meaning of the sentence"
              />
            </Grid>
            {selectedVocabulary.examples.length > 1 && (
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
        <Button
          onClick={handleAddExample}
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
        >
          Add Example
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpdateVocabulary}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateVocabularyDialog;