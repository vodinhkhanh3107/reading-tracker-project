import { Request, Response } from "express";

import { searchBooks } from "../usecases/book/search-book.usecase";
import { getBookDetail } from "../usecases/book/get-book-detail.usecase";
import { getBooksUseCase } from "../usecases/book/get-books.use-case";
import { Book } from "../entities/Book";

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

export const getBooks = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const {
      page = 1,
      limit = 20,
    } = req.query;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    if (
      !Number.isInteger(currentPage) ||
      currentPage < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Page must be greater than or equal to 1",
      });
    }

    if (
      !Number.isInteger(currentLimit) ||
      currentLimit < 1 ||
      currentLimit > 20
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Limit must be between 1 and 20",
      });
    }

    const result =
      await getBooksUseCase({
        page: currentPage,
        limit: currentLimit,
      });

    return res.status(200).json({
      success: true,
      data: {
        total: result.total,
        page: currentPage,
        limit: currentLimit,
        books: result.books,
      },
    });
  } catch (error) {
    console.error(
      "Get books error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get books",
    });
  }
};