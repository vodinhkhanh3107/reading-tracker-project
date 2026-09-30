
import express from "express";
import { bookRoutes } from "./book.route";
import { shelfBookRoutes } from "./shelf-book.route";

export const router = express.Router();

router.use("/books", bookRoutes);
router.use("/shelf-books", shelfBookRoutes);
