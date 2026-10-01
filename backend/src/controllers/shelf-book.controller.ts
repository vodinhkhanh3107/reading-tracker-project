import { Request, Response } from "express";
import { getShelfBooksUsecase } from "../usecases/shelf-book/get-shelf-books.usecase";
import { addBookToShelfUsecase } from "../usecases/shelf-book/add-book-to-shelf.usecase";
import { ReadingStatus } from "../entities/ShelfBook";
import { updateProgressUseCase } from "../usecases/shelf-book/update-progress.usecase";
import { updateRatingUseCase } from "../usecases/shelf-book/update-rating.usecase";
import { updateNoteUseCase } from "../usecases/shelf-book/update-note.usecase";
import { removeFromShelfUseCase } from "../usecases/shelf-book/remove-from-shelf.usecase";

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
      message: "Book added to shelf successfully",
      data: shelfBook,
    });
  } catch (error) {
    console.error(
      "Add book to shelf error:",
      error,
    );

    if (error instanceof Error) {
      console.log("Error message:", error.message);

      if (error.message === "Book not found") {
        return res.json({
          success: false,
          message: "Book not found",
        });
      }

      if (
        error.message ===
        "Book already exists in shelf"
      ) {
        return res.json({
          success: false,
          message:
            "Book already exists in shelf",
        });
      }

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add book to shelf",
    });
  }
};


export const updateProgress = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid shelf book ID",
      });
    }

    const currentPage = Number(
      req.body.currentPage,
    );

    if (
      !Number.isInteger(currentPage)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current page must be an integer",
      });
    }

    const shelfBook =
      await updateProgressUseCase({
        id,
        currentPage,
      });

    return res.status(200).json({
      success: true,
      message:
        "Reading progress updated successfully",
      data: shelfBook,
    });
  } catch (error) {
    console.error(
      "Update progress error:",
      error,
    );

    if (error instanceof Error) {
      switch (error.message) {
        case "SHELF_BOOK_NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Shelf book not found",
          });

        case "INVALID_CURRENT_PAGE":
          return res.status(400).json({
            success: false,
            message:
              "Current page must be greater than or equal to 0",
          });

        case "CURRENT_PAGE_EXCEEDS_TOTAL_PAGES":
          return res.status(400).json({
            success: false,
            message:
              "Current page exceeds total pages",
          });
      }
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update reading progress",
    });
  }
};


export const updateRating = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid shelf book ID",
      });
    }

    const rating =
      req.body.rating === null
        ? null
        : Number(req.body.rating);

    if (
      rating !== null &&
      !Number.isInteger(rating)
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer",
      });
    }

    const shelfBook =
      await updateRatingUseCase({
        id,
        rating,
      });

    return res.status(200).json({
      success: true,
      message:
        "Book rating updated successfully",
      data: shelfBook,
    });
  } catch (error) {
    console.error(
      "Update rating error:",
      error,
    );

    if (error instanceof Error) {
      switch (error.message) {
        case "SHELF_BOOK_NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Shelf book not found",
          });

        case "INVALID_RATING":
          return res.status(400).json({
            success: false,
            message:
              "Rating must be between 1 and 5",
          });
      }
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update book rating",
    });
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid shelf book ID",
      });
    }

    const note =
      req.body.note === null
        ? null
        : String(req.body.note);

    const shelfBook =
      await updateNoteUseCase({
        id,
        note,
      });

    return res.status(200).json({
      success: true,
      message:
        "Book note updated successfully",
      data: shelfBook,
    });
  } catch (error) {
    console.error(
      "Update note error:",
      error,
    );

    if (
      error instanceof Error &&
      error.message === "SHELF_BOOK_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Shelf book not found",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update book note",
    });
  }
};

export const removeFromShelf = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid shelf book ID",
      });
    }

    await removeFromShelfUseCase({ id });

    return res.status(200).json({
      success: true,
      message: "Book removed from shelf successfully",
    });
  } catch (error) {
    console.error(
      "Remove book from shelf error:",
      error,
    );

    if (
      error instanceof Error &&
      error.message === "SHELF_BOOK_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Shelf book not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to remove book from shelf",
    });
  }
};