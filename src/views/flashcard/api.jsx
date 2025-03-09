import axios from "axios";

const API_URL = "http://localhost:8000/api/flashcard-daily";

export const fetchFlashcardDaily = async () => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.data && response.data.data && response.data.data.flashcards) {
      return response.data.data.flashcards;
    } else {
      console.error("API returned an unexpected response:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return [];
  }
};

export const confirmFlashcard = async (vocabulary_id, answer, type) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.post(`${API_URL}/confirm`, { vocabulary_id, answer, type }, {
      headers: {  
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error confirming flashcard:", error);
    return { success: false, message: "Error confirming flashcard" };
  }
};

export const fetchVocabularies = async ({
  limit,
  page,
  option,
}) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: { limit, page, option },
    });

    if (!response.data || !response.data.data) {
      console.error("API returned an unexpected response:", response.data);
      return { pagination: {}, vocabularies: [] };
    }

    return {
      pagination: response.data.data.pagination || {},
      vocabularies: response.data.data.vocabularies || [],
    };
  } catch (error) {
    console.error("Error fetching vocabularies:", error);
    return { pagination: {}, vocabularies: [] }; 
  }
};