import * as shelfBookRepository
  from "../../repositories/shelf-book.repository";

export interface UpdateNoteInput {
  id: number;
  note: string | null;
}

export const updateNoteUseCase = async ({
  id,
  note,
}: UpdateNoteInput) => {
  const shelfBook =
    await shelfBookRepository.findById(id);

  if (!shelfBook) {
    throw new Error("SHELF_BOOK_NOT_FOUND");
  }

  return shelfBookRepository.update(
    shelfBook,
    {
      note,
    },
  );
};