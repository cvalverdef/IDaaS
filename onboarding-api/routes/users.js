const express = require("express");
const { getUsers, updateKYCStatus, uploadDocument } = require("../controllers/usersController");

const router = express.Router();

router.get("/", getUsers); // Fetch all users
router.put("/:id/kyc", updateKYCStatus); // Update KYC status
router.post("/:id/upload", uploadDocument); // Upload document

module.exports = router;
