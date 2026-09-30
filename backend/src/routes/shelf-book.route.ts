import express from "express";
import * as ShelfBookController from "../controllers/shelf-book.controller";

export const shelfBookRoutes = express.Router();

shelfBookRoutes.get("/", ShelfBookController.getShelfBooks);
shelfBookRoutes.post("/", ShelfBookController.addBookToShelf);
