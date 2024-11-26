const pool = require("../db/db");

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Update KYC Status
const updateKYCStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Upload Document
const uploadDocument = async (req, res) => {
  const { id } = req.params;
  const { documentPath } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET document_path = $1 WHERE id = $2 RETURNING *",
      [documentPath, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload document" });
  }
};

const testDBConnection = async () => {
  try {
    const result = await pool.query("SELECT 1");
    console.log("Database connection successful:", result);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

testDBConnection();


module.exports = {
  getUsers,
  updateKYCStatus,
  uploadDocument,
};
