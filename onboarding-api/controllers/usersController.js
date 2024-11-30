const pool = require("../db/db");
const bcrypt = require("bcrypt");

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create a new account
const createAccount = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW()) RETURNING id, email`,
      [email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ error: "Failed to create account" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "Full name, email, and password are required." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, full_name, email`,
      [full_name, email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Verify user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Failed to login" });
  }
};

// Update KYC status
const updateKYCStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "ID and status are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET kyc_status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating KYC status:", err);
    res.status(500).json({ error: "Failed to update KYC status" });
  }
};

// Upload document
const uploadDocument = async (req, res) => {
  const { id } = req.params;
  const { documentPath } = req.body;

  if (!id || !documentPath) {
    return res.status(400).json({ error: "ID and documentPath are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET document_path = $1 WHERE id = $2 RETURNING *",
      [documentPath, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading document:", err);
    res.status(500).json({ error: "Failed to upload document" });
  }
};

module.exports = {
  getUsers,
  createAccount,
  createUser,
  loginUser,
  updateKYCStatus,
  uploadDocument,
};
