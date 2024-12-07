// const fetch = require("node-fetch");
const { MATEO_API_KEY, MATEO_API_SECRET, MATEO_API_HOST } = process.env;
const crypto = require("crypto");

const createAccount = async (req, res) => {
const { userName, eMail, phoneNr, password, signature, nonce } = req.body;

  if (!userName || !eMail || !password) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
      
    const payload = {
      userName,
      eMail,
      phoneNr,
      password,
      apiKey: MATEO_API_KEY,
      nonce,
      signature,
      seconds: 3600,
    };
    console.log("payload", payload )
    const response = await fetch(`https://mateo.lab.tagroot.io/Agent/Account/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(201).json(data);
    } else {
      const errorContent = await response.text();
      res.status(response.status).send(errorContent);
    }
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Account creation failed" });
  }
};

module.exports = { createAccount };
