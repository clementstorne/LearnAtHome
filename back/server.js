const express = require("express");

const DB = require("./config/db.config");

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to Learn@Home backend");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
