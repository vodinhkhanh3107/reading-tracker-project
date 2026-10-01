
import type { Request, Response, NextFunction } from "express";
import { getDashboardUseCase } from "../usecases/dashboard/dashboard.usecase";

export const getDashboard = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getDashboardUseCase();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};