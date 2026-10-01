import {
  ReadingStatus,
} from "../../entities/ShelfBook";

import * as shelfBookRepository
  from "../../repositories/shelf-book.repository";

export interface UpdateProgressInput {
  id: number;
  currentPage: number;
}

export const updateProgressUseCase = async ({
  id,
  currentPage,
}: UpdateProgressInput) => {
  const shelfBook =
    await shelfBookRepository.findById(id);

  if (!shelfBook) {
    throw new Error("SHELF_BOOK_NOT_FOUND");
  }

  // Không cho phép số trang âm
  if (currentPage < 0) {
    throw new Error("INVALID_CURRENT_PAGE");
  }

  const totalPages =
    shelfBook.book.numberOfPages;

  // Nếu sách có tổng số trang
  // thì currentPage không được vượt quá
  if (
    totalPages !== null &&
    currentPage > totalPages
  ) {
    throw new Error(
      "CURRENT_PAGE_EXCEEDS_TOTAL_PAGES",
    );
  }

  const oldStatus = shelfBook.status;

  let newStatus: ReadingStatus;

  if (currentPage === 0) {
    newStatus =
      ReadingStatus.WANT_TO_READ;
  } else if (
    totalPages !== null &&
    currentPage === totalPages
  ) {
    newStatus =
      ReadingStatus.COMPLETED;
  } else {
    newStatus =
      ReadingStatus.READING;
  }

  const data: Partial<typeof shelfBook> = {
    currentPage,
    status: newStatus,
  };

  if (
    oldStatus === ReadingStatus.WANT_TO_READ &&
    newStatus === ReadingStatus.READING
  ) {
    data.startedAt = new Date();
  }

  // Nếu quay lại WANT_TO_READ
  if (
    newStatus === ReadingStatus.WANT_TO_READ
  ) {
    data.startedAt = null;
    data.finishedAt = null;
  }

  if (
    oldStatus !== ReadingStatus.COMPLETED &&
    newStatus === ReadingStatus.COMPLETED
  ) {
    data.finishedAt = new Date();
  }

  // Nếu đang COMPLETED nhưng quay lại READING
  if (
    oldStatus === ReadingStatus.COMPLETED &&
    newStatus === ReadingStatus.READING
  ) {
    data.finishedAt = null;
  }

  return shelfBookRepository.update(
    shelfBook,
    data,
  );
};