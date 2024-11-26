import axios from "axios";

const API_URL = "https://api.kyc-kyb.ws";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data) => {
  return api.post("/register", data);
};

export const loginUser = async (data) => {
  return api.post("/login", data);
};

export const checkKYC = async (data) => {
  return api.post("/kyc/check", data);
};

export default api;
