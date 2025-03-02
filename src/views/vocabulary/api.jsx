import axios from "axios";

const API_URL = "http://localhost:8000/api/vocabulary";

export const fetchVocabularies = async ({ limit, word, page, type, category_id }) => {
    const access_token = localStorage.getItem("access_token");
  
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: { limit, word, page, type, category_id },
      });
  
      // Kiểm tra response có hợp lệ không
      if (!response.data || !response.data.data) {
        console.error("API returned an unexpected response:", response.data);
        return { pagination: {}, vocabularies: [] }; // Trả về giá trị mặc định
      }
  
      return {
        pagination: response.data.data.pagination || {},
        vocabularies: response.data.data.vocabularies || [], // Nếu null thì thay bằng []
      };
    } catch (error) {
      console.error("Error fetching vocabularies:", error);
      return { pagination: {}, vocabularies: [] }; // Trả về dữ liệu mặc định khi lỗi
    }
  };

  export const deleteVocabulary = async (id) => {
    const access_token = localStorage.getItem("access_token");
  
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
      return null;
    }
  };

  export const createVocabulary = async (vocabularyData) => {
    const access_token = localStorage.getItem("access_token");
  
    try {
      const response = await axios.post(API_URL, vocabularyData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error creating vocabulary:", error);
      return null;
    }
  };