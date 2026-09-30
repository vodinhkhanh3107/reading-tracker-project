import express from "express";
import * as bookController from "../controllers/book.controller";

export const bookRoutes = express.Router();

bookRoutes.get("/", bookController.getBooks);
bookRoutes.get("/search", bookController.search);
bookRoutes.get("/:workId", bookController.detail);
