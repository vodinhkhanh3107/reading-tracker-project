import express from "express";
import cors from "cors";
import { router } from "./routes/index.route";



const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/v1", router);


export default app;