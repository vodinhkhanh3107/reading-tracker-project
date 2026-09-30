import * as shelfBookRepository
  from "../../repositories/shelf-book.repository";

import {
  ReadingStatus,
} from "../../entities/ShelfBook";

interface GetShelfBooksParams {
  status?: string;
}

export const getShelfBooksUsecase = async ({
  status,
}: GetShelfBooksParams) => {
  if (status) {
    if (
      !Object.values(ReadingStatus).includes(
        status as ReadingStatus,
      )
    ) {
      throw new Error("Invalid reading status");
    }

    return shelfBookRepository.findByStatus(
      status as ReadingStatus,
    );
  }

  return shelfBookRepository.findAll();
};