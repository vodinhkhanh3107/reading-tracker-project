import express from "express";
import * as dashBoardController from "../controllers/dashboard.controller";

export const dashBoardRoutes = express.Router();

dashBoardRoutes.get("/", dashBoardController.getDashboard);