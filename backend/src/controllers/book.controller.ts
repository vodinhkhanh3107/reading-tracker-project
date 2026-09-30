import { Request, Response } from "express";

import { searchBooks } from "../usecases/book/search-book.usecase";
import { getBookDetail } from "../usecases/book/get-book-detail.usecase";


export const search = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    const result = await searchBooks({
      keyword: q?.toString() || "",
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to search books",
    });
  }
};

export const detail = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { workId } = req.params;
  
    if (typeof workId !== "string" || !workId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Work ID is required",
      });
    }

    const bookDetail = await getBookDetail(workId);
    return res.status(200).json({
      success: true,
      data: bookDetail,
    });
  } catch (error) {
    console.error("Get book detail error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get book detail",
    });
  }
};
