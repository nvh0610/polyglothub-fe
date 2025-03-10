import axios from "axios";
import { HOST_API } from "../../constants/PathUri";

const API_URL = `${HOST_API}/category`;

export const fetchCategories = async ({ limit, name, page }) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: { limit, name, page },
    });

    // Kiểm tra response có hợp lệ không
    if (!response.data || !response.data.data) {
      console.error("API returned an unexpected response:", response.data);
      return { pagination: {}, categories: [] }; // Trả về giá trị mặc định
    }

    return {
      pagination: response.data.data.pagination || {},
      categories: response.data.data.categories || [], // Nếu null thì thay bằng []
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { pagination: {}, categories: [] }; // Trả về dữ liệu mặc định khi lỗi
  }
};

export const deleteCategory = async (id) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
};

export const createCategory = async (name) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.post(
      API_URL,
      { name },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
};

export const updateCategory = async (id, name) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};
