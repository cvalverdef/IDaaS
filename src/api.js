import axios from "axios";
import crypto from "crypto-browserify";

const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Function to calculate the signature
const calculateSignature = (data, secret) => {
  const { PUserName, Host, PEMail, PPhoneNr, PPassword, PApiKey, PNonce } = data;
  const key = Buffer.from(secret, "utf-8");

  let s = `${PUserName}:${Host}:${PEMail}`;
  if (PPhoneNr) {
    s += `:${PPhoneNr}`;
  }
  s += `:${PPassword}:${PApiKey}:${PNonce}`;

  const dataBuffer = Buffer.from(s, "utf-8");
  const hmac = crypto.createHmac("sha256", key).update(dataBuffer).digest("base64");
  return hmac;
};

// Create account
const createAccount = async (formData) => {
  const PApiKey = "YOUR_API_KEY"; // Replace with your API key
  const Secret = "YOUR_SECRET"; // Replace with your secret
  const Host = "lab.tagroot.io"; // Host for the Neuron API
  const PNonce = new Date().getTime();

  const signatureData = {
    PUserName: formData.fullName,
    Host,
    PEMail: formData.email,
    PPhoneNr: formData.mobile,
    PPassword: formData.password,
    PApiKey,
    PNonce,
  };

  const PSignature = calculateSignature(signatureData, Secret);

  const requestData = {
    ...formData,
    PApiKey,
    PNonce,
    PSignature,
  };

  try {
    const response = await axios.post(`${API_URL}/account/create`, requestData);
    return response.data;
  } catch (error) {
    console.error("Error in createAccount:", error.response?.data || error.message);
    throw error;
  }
};

export { createAccount };
