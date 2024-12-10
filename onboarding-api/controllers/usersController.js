const { MATEO_API_KEY, MATEO_API_SECRET, MATEO_API_HOST } = process.env;
const crypto = require("crypto");
const fetch = require("node-fetch");

const createAccount = async (req, res) => {
  const { userName, eMail, phoneNr, password, nonce, signature } = req.body;

  if (!userName || !eMail || !password || !nonce) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // Construct signature for validation
    // const dataToSign = phoneNr
    //   ? `${userName}:${MATEO_API_HOST}:${eMail}:${phoneNr}:${password}:${MATEO_API_KEY}:${nonce}`
    //   : `${userName}:${MATEO_API_HOST}:${eMail}:${password}:${MATEO_API_KEY}:${nonce}`;
    // const signature = crypto
    //   .createHmac("sha256", MATEO_API_SECRET)
    //   .update(dataToSign)
    //   .digest("base64");

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

    const response = await fetch(`https://${MATEO_API_HOST}/Agent/Account/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return res.status(201).json(data);
    } else {
      const errorContent = await response.text();
      console.error("API Error:", errorContent);
      return res.status(response.status).send(errorContent);
    }
  } catch (error) {
    console.error("Error creating account:", error.message);
    return res.status(500).json({ error: "Account creation failed" });
  }
};

module.exports = { createAccount };
