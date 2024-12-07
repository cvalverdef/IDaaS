const express = require("express");
const router = express.Router();
const {
  createAccount,
  createUser,
  loginUser,
  getUsers,
  updateKYCStatus,
  uploadDocument,
} = require("../controllers/usersController");

// Ensure routes are correctly registered and mapped
router.post("/account/create", createAccount); // Create account
// router.post("/users/create", createUser); // Create user
// router.get("/users", getUsers); // Fetch all users
// router.put("/users/:id/kyc", updateKYCStatus); // Update KYC status
// router.post("/users/:id/upload", uploadDocument); // Upload document
// router.post("/users/login", loginUser); // User login

module.exports = router;
