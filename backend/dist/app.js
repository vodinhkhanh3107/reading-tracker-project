import express from "express";
import cors from "cors";
import { bookRoutes } from "./routes/book.route";
// import shelfBookRoutes from "./routes/shelf-book.route";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});
app.use("/api/v1/books", bookRoutes);
// app.use(
//   "/api/v1/shelf-books",
//   shelfBookRoutes,
// );
export default app;
//# sourceMappingURL=app.js.map