import * as shelfBookRepository
  from "../../repositories/shelf-book.repository";

export interface UpdateRatingInput {
  id: number;
  rating: number | null;
}

export const updateRatingUseCase = async ({
  id,
  rating,
}: UpdateRatingInput) => {
  const shelfBook =
    await shelfBookRepository.findById(id);

  if (!shelfBook) {
    throw new Error("SHELF_BOOK_NOT_FOUND");
  }

  if (
    rating !== null &&
    (!Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5)
  ) {
    throw new Error("INVALID_RATING");
  }

  return shelfBookRepository.update(
    shelfBook,
    {
      rating,
    },
  );
};