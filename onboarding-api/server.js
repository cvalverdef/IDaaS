require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); 
const app = express();
const userRouter = require("./routes/users")

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRouter)
const port = process.env.PORT || 5000;

// Verify account route
app.post("/verify-account", async (req, res) => {
  const { confirmationCodeSms, confirmationCodeEmail, phoneNr, email } = req.body;
  const token = req.headers["x-token"]
  
  if (!confirmationCodeSms || !confirmationCodeEmail) {
    return res.status(400).json({ error: "SMS and Email Confirmation codes are required" });
  }

  try {
    const responseAll = [];

    const verifyTokenEmail = await fetch(`https://mateo.lab.tagroot.io/Agent/Account/VerifyEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ code: confirmationCodeEmail, eMail: email }),
    });

    if (!verifyTokenEmail.ok) {
      const errorText = await verifyTokenEmail.text();
      console.error("Email Verification API Error:", errorText);
      responseAll.push({ type: "email", errorText });
    }

    const verifyTokenSms = await fetch(`https://mateo.lab.tagroot.io/Agent/Account/VerifyPhoneNr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ code: confirmationCodeSms, phoneNr }),
    });

    if (!verifyTokenSms.ok) {
      const errorText = await verifyTokenSms.text();
      console.error("SMS Verification API Error:", errorText);
      responseAll.push({ type: "sms", errorText });
    }

    if(responseAll.lenght > 0){
      return res.status(400).json({ error: responseAll });
    }
    
    const data = await verifyTokenEmail.json();
    res.json(data);
  } catch (error) {
    console.error("Error verifying account:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
