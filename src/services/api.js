import axios from "axios";

// Use environment variable for flexibility
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data) => {
  return api.post("/users/register", data);
};

export const loginUser = async (data) => {
  return api.post("/users/login", data);
};

export const checkKYC = async (data) => {
  return api.post("/users/kyc", data);
};

export default api;
