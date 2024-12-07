require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Account creation route
app.post("/api/account/create", async (req, res) => {
  const { userName, eMail, phoneNr, password } = req.body;

  const apiKey = process.env.API_KEY;
  const secret = process.env.SECRET_KEY;
  const host = process.env.API_HOST;

  if (!userName || !eMail || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // External API call
  try {
    const nonce = generateNonce();
    const payload = {
      userName,
      eMail,
      phoneNr,
      password,
      apiKey,
      nonce,
    };

    // Generate signature
    const signature = generateSignature(secret, payload);

    const response = await fetch(`https://${host}/Agent/Account/Create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...payload, signature }),
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      const errorText = await response.text();
      res.status(response.status).send(errorText);
    }
  } catch (error) {
    console.error("Error creating account:", error.message);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Account verification route
app.post("/api/account/verify", async (req, res) => {
  const { confirmationCode } = req.body;

  const apiKey = process.env.API_KEY;
  const host = process.env.API_HOST;

  if (!confirmationCode) {
    return res.status(400).json({ error: "Confirmation code is required" });
  }

  try {
    const response = await fetch(`https://${host}/Agent/Account/Verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ confirmationCode }),
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      const errorText = await response.text();
      res.status(response.status).send(errorText);
    }
  } catch (error) {
    console.error("Error verifying account:", error.message);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Utility function to generate a nonce
function generateNonce(length = 32) {
  return [...Array(length)]
    .map(() => Math.random().toString(36)[2])
    .join("");
}

// Utility function to generate a signature
function generateSignature(secret, payload) {
  const crypto = require("crypto");
  const dataString = Object.values(payload).join(":");
  return crypto.createHmac("sha256", secret).update(dataString).digest("base64");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
