const express = require("express");

const bookController = require("../controllers/book.controller");

const router = express.Router();

router.get("/search", bookController.searchBooks);

module.exports = router;