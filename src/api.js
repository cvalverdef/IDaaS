// src/api.js

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
    const response = await fetch("http://localhost:5000/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error creating account: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in createAccount:", error);
    throw error;
  }
};

// Function to fetch users
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users");
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchUsers:", error);
    throw error;
  }
};

// Function to update KYC status
const updateKYCStatus = async (id, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${id}/kyc`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Error updating KYC status: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in updateKYCStatus:", error);
    throw error;
  }
};

// Function to upload a document
const uploadDocument = async (id, documentPath) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${id}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentPath }),
    });

    if (!response.ok) {
      throw new Error(`Error uploading document: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in uploadDocument:", error);
    throw error;
  }
};

// Export functions for use in other components
export { connectWebSocket, createAccount, fetchUsers, updateKYCStatus, uploadDocument };
