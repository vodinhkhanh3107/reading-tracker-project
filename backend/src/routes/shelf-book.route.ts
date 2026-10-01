import express from "express";
import * as ShelfBookController from "../controllers/shelf-book.controller";

export const shelfBookRoutes = express.Router();

shelfBookRoutes.get("/", ShelfBookController.getShelfBooks);
shelfBookRoutes.post("/", ShelfBookController.addBookToShelf);
shelfBookRoutes.patch("/:id/progress",ShelfBookController.updateProgress);
shelfBookRoutes.patch("/:id/rating",ShelfBookController.updateRating);
shelfBookRoutes.patch("/:id/note",ShelfBookController.updateNote);
shelfBookRoutes.delete("/:id",ShelfBookController.removeFromShelf);




