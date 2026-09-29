import { Request, Response } from "express";

import * as openLibraryService from "../services/open-library.service";

import axios from "axios";

export const searchBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q || !q.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    if (currentPage < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be greater than or equal to 1",
      });
    }

    if (currentLimit < 1 || currentLimit > 20) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 20",
      });
    }

    const data = await openLibraryService.searchBooks({
      keyword: q.toString().trim(),
      page: currentPage,
      limit: currentLimit,
    });

    console.log("Data from Open Library API:", data);

    return res.status(200).json({
      success: true,
      data: {
        total: data.total,
        page: currentPage,
        limit: currentLimit,
        books: data.books,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to search books",
    });
  }
};

export const getBookDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { workId } = req.params;

    if (!workId || !workId.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Work ID is required",
      });
    }

    const book = await openLibraryService.getBookDetail(
      workId.toString().trim()
    );

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Get book detail error:", error);

    if (axios.isAxiosError(error) &&
      error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get book detail",
    });
  }
};
