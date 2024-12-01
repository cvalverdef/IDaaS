import axios from "axios";

// Use environment variable for flexibility
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to establish WebSocket connection
const connectWebSocket = () => {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUri = `${protocol}://lab.tagroot.io/ClientEventsWS`;

  const ws = new WebSocket(wsUri);

  ws.onopen = () => {
    console.log("WebSocket connection established.");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onmessage = (message) => {
    console.log("WebSocket message received:", message.data);
  };

  return ws;
};

// Function to create an account
const createAccount = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/account/create`, formData);
    return response.data;
  } catch (error) {
    console.error("Error in createAccount:", error.response?.data || error.message);
    throw error;
  }
};

// // Create account
// export const createAccount = async (data) => {
//   try {
//     const response = await api.post("/account/create", data);
//     return response.data;
//   } catch (error) {
//     console.error("Error in createAccount:", error.response?.data || error.message);
//     throw error;
//   }
// };

// Function to login a user
const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData);
    return response.data;
  } catch (error) {
    console.error("Error in loginUser:", error.response?.data || error.message);
    throw error;
  }
};

// Function to check KYC status
const checkKYC = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/kyc`, formData);
    return response.data;
  } catch (error) {
    console.error("Error in checkKYC:", error.response?.data || error.message);
    throw error;
  }
};

// Export all API functions
export { api, createAccount, loginUser, checkKYC, connectWebSocket };
