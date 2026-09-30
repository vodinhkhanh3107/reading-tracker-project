import { Request, Response } from "express";
import { getShelfBooksUsecase } from "../usecases/shelf-book/get-shelf-books.usecase";
import { addBookToShelfUsecase } from "../usecases/shelf-book/add-book-to-shelf.usecase";
import { ReadingStatus } from "../entities/ShelfBook";

export const getShelfBooks = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { status } = req.query;

    const result =
      await getShelfBooksUsecase({
        status:
          typeof status === "string"
            ? status
            : undefined,
      });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "Invalid reading status"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get shelf books",
    });
  }
};



export const addBookToShelf = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { bookId, status } = req.body;

    const shelfBook =
      await addBookToShelfUsecase({
        bookId: Number(bookId),
        status:
          typeof status === "string"
            ? (status as ReadingStatus)
            : undefined,
      });

    return res.status(201).json({
      success: true,
      data: shelfBook,
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to add book to shelf";

    if (message === "Book not found") {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    if (
      message === "Book already exists in shelf"
    ) {
      return res.status(409).json({
        success: false,
        message,
      });
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }
};