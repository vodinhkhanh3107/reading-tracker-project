import api from "./api";

export type ReadingStatus =
  | "WANT_TO_READ"
  | "READING"
  | "COMPLETED";

export interface AddBookToShelfRequest {
  bookId: number;
  status: ReadingStatus;
}

export const addBookToShelf = async (
  data: AddBookToShelfRequest,
) => {
  const response = await api.post(
    "/shelf-books",
    data,
  );

  return response.data;
};