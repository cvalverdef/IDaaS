const express = require("express");
const cors = require("cors");

const createServer = () => {
  const app = express();

  // Middleware
  app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the frontend
  app.use(express.json()); // Parse incoming JSON requests

  return app;
};

module.exports = createServer;
