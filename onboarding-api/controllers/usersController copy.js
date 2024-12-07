const fetch = require("node-fetch");
const { API_KEY, API_SECRET, API_HOST } = process.env;

const createAccount = async (req, res) => {
  const { userName, eMail, phoneNr, password } = req.body;

  if (!userName || !eMail || !password) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const nonce = Math.random().toString(36).substring(2, 15);
    const dataToSign = `${userName}:${API_HOST}:${eMail}:${password}:${API_KEY}:${nonce}`;
    const hmac = require("crypto")
      .createHmac("sha256", API_SECRET)
      .update(dataToSign)
      .digest("base64");

    const payload = {
      userName,
      eMail,
      phoneNr,
      password,
      apiKey: API_KEY,
      nonce,
      signature: hmac,
      seconds: 3600,
    };

    const response = await fetch(`https://${API_HOST}/Agent/Account/Create`, {
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
