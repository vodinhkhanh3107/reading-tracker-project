import express from "express";
import * as bookController from "../controllers/book.controller";

export const bookRoutes = express.Router();

bookRoutes.get("/search", bookController.searchBooks);
bookRoutes.get("/:workId", bookController.getBookDetail);
