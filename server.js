const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

app.get("/", (req, res) => res.send("API Running"));
