import * as bookRepository from "../../repositories/book.repository";

interface GetBooksInput {
  page: number;
  limit: number;
}

export const getBooksUseCase = async ({
  page,
  limit,
}: GetBooksInput) => {
  return await bookRepository.findAll(
    page,
    limit,
  );
};