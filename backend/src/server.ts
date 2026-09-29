import "dotenv/config";

import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    console.log(
      "Database connected successfully",
    );

    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error,
    );

    process.exit(1);
  }
};

startServer();