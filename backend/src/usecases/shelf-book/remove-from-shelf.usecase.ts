import * as shelfBookRepository
  from "../../repositories/shelf-book.repository";

export interface RemoveFromShelfInput {
  id: number;
}

export const removeFromShelfUseCase = async ({
  id,
}: RemoveFromShelfInput): Promise<void> => {
  const shelfBook =
    await shelfBookRepository.findById(id);

  if (!shelfBook) {
    throw new Error("SHELF_BOOK_NOT_FOUND");
  }

  await shelfBookRepository.remove(shelfBook);
};