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