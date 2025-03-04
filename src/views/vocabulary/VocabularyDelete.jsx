import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { deleteVocabulary, fetchVocabularies } from './api'; // Giả định bạn có file api.js
import { useParams } from 'react-router-dom';

function DeleteVocabularyDialog({
  open,
  onClose,
  selectedVocabulary,
  setVocabularies,
  limit,
  searchTerm,
  page,
  data_type,
}) {
  const { id } = useParams();

  const handleDelete = async () => {
    if (!selectedVocabulary) return;

    try {
      const isDeleted = await deleteVocabulary(selectedVocabulary.id);

      if (isDeleted) {
        const updatedData = await fetchVocabularies({
          limit,
          word: searchTerm,
          page,
          data_type,
          category_id: id,
        });
        setVocabularies(updatedData);
        onClose();
      } else {
        console.error("Failed to delete vocabulary.");
      }
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Vocabulary</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this vocabulary?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteVocabularyDialog;