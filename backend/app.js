const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/book.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/v1/books", bookRoutes);

module.exports = app;