const axios = require("axios");
const pool = require("../db/db");
const bcrypt = require("bcrypt");

// Create account with Neuron Agent API
const createAccount = async (req, res) => {
  const { fullName, email, password, mobile } = req.body;

  if (!fullName || !email || !password || !mobile) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await axios.post("https://lab.tagroot.io/Neuron/Agent/Account/Create", {
      email,
      password,
      fullName,
      mobile,
    });

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, mobile, agent_response, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, full_name, email, mobile`,
      [fullName, email, hashedPassword, mobile, JSON.stringify(response.data)]
    );

    res.status(201).json({
      message: "Account created successfully",
      user: result.rows[0],
      agentResponse: response.data,
    });
  } catch (err) {
    console.error("Error creating account:", err.message || err.response?.data);

    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data });
    }

    res.status(500).json({ error: "Account creation failed" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password, mobile } = req.body;

    if (!fullName || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, mobile, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, full_name, email, mobile`,
      [fullName, email, hashedPassword, mobile]
    );

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, fullName: user.full_name, email: user.email },
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ error: "Failed to login" });
  }
};

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, full_name, email, mobile FROM users`);

    res.status(200).json({
      users: result.rows,
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Update KYC status
const updateKYCStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE users SET kyc_status = $1 WHERE id = $2 RETURNING id, full_name, email, kyc_status`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "KYC status updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating KYC status:", err.message);
    res.status(500).json({ error: "Failed to update KYC status" });
  }
};

// Upload document
const uploadDocument = async (req, res) => {
  try {
    // Assuming multer or similar middleware handles file upload
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await pool.query(
      `UPDATE users SET document_path = $1 WHERE id = $2 RETURNING id, full_name, email, document_path`,
      [file.path, id]
    );

    res.status(200).json({
      message: "Document uploaded successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error uploading document:", err.message);
    res.status(500).json({ error: "Failed to upload document" });
  }
};

module.exports = {
  createAccount,
  createUser,
  loginUser,
  getUsers,
  updateKYCStatus,
  uploadDocument,
};
