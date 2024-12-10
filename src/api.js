import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const connectWebSocket = () => {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUri = `${protocol}://mateo.lab.tagroot.io/ClientEventsWS`;

  const ws = new WebSocket(wsUri);

  ws.onopen = () => {
    console.info("WebSocket connection established.");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onmessage = (message) => {
    console.info("WebSocket message received:", message.data);
  };

  return ws;
};

const createAccount = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/account/create`, formData);
    return response.data;
  } catch (error) {
    console.error("Error in createAccount:", error.response?.data || error.message);
    throw error;
  }
};

const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData);
    return response.data;
  } catch (error) {
    console.error("Error in loginUser:", error.response?.data || error.message);
    throw error;
  }
};

const checkKYC = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/kyc`, formData);
    return response.data;
  } catch (error) {
    console.error("Error in checkKYC:", error.response?.data || error.message);
    throw error;
  }
};

export { api, createAccount, loginUser, checkKYC, connectWebSocket };
