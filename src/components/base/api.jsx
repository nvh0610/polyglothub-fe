import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

export const changePassword = async (data) => {
  const access_token = localStorage.getItem("access_token");
  const response = await axios.post(`${API_URL}/change-password`, {
    old_password: data.oldPassword,
    new_password: data.newPassword,
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};