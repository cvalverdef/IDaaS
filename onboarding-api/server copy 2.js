require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); 
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// Verify account route
app.post("/verify-account", async (req, res) => {
  const { confirmationCode, email } = req.body;

  if (!confirmationCode) {
    return res.status(400).json({ error: "Confirmation code is required" });
  }

  const apiKey = "9b8d5e91384b0430065ca3651daf156c3b1973b0abb704ab2873663f49cc3470"; 
  // const host = process.env.MATEO_HOST;

  try {
    const verifyToken = await fetch(`https://mateo.lab.tagroot.io/Agent/Account/GetSessionToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(verifyToken)
    const response = await fetch(`https://mateo.lab.tagroot.io/Agent/Account/VerifyEMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${verifyToken.data.AccountCreated.jwt}`,
      },
      body: JSON.stringify({ code: confirmationCode, email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error verifying account:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
