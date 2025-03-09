import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

export const forgotPassword = async (data) => {
  const response = await axios.post(`${API_URL}/forget-password`, {
    username: data.username,
  });
  return response.data;
};

export const verifyPassword = async (data) => {
  const response = await axios.post(`${API_URL}/verify-otp`, {
    username: data.username,
    otp: data.otp,
  });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(`${API_URL}/reset-password`, {
    username: data.username,
    password: data.password,
  });
  return response.data;
};
