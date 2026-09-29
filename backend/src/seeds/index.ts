import "dotenv/config";

import { AppDataSource } from "../config/database";
import { seedBooks } from "./book.seed";

const runSeed = async (): Promise<void> => {
  try {
    console.log("Connecting to database...");

    await AppDataSource.initialize();

    console.log("Database connected");

    await seedBooks();

    await AppDataSource.destroy();

    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);

    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }

    process.exit(1);
  }
};

runSeed();