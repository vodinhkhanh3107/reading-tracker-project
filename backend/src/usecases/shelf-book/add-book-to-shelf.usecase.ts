import { ReadingStatus } from "../../entities/ShelfBook";
import * as shelfBookRepository from "../../repositories/shelf-book.repository";
import * as bookRepository from "../../repositories/book.repository";

interface AddBookToShelfParams {
  bookId: number;
  status?: ReadingStatus;
}

export const addBookToShelfUsecase = async ({
  bookId,
  status=ReadingStatus.WANT_TO_READ,
}: AddBookToShelfParams) => {
  if (!Number.isInteger(bookId) || bookId < 1) {
    throw new Error("Invalid book ID");
  }

  const book =
    await bookRepository.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  const existingShelfBook =
    await shelfBookRepository.findByBookId(bookId);

  if (existingShelfBook) {
    throw new Error(
      "Book already exists in shelf",
    );
  }

  return shelfBookRepository.create({
      book,
      status,
      currentPage: 0,
      rating: null,
      note: null,
      startedAt: null,
      finishedAt: null,
  });
};