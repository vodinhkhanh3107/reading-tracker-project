import type { ReadingStatus, ShelfBook } from "../types/shelf-book";
import api from "./api";

export interface AddBookToShelfRequest {
  bookId: number;
  status: ReadingStatus;
}

export interface GetShelfBooksParams {
  status?: string;
  page?: number;
  limit?: number;
}



export const addBookToShelf = async (data: AddBookToShelfRequest) => {
  const response = await api.post("/shelf-books", data);

  return response.data;
};

export const getShelfBooks = async (
  params?: GetShelfBooksParams,
): Promise<ShelfBook[]> => {
  const response = await api.get("/shelf-books", {
    params,
  });

  return response.data.data;
};

export const updateProgress = async (
  shelfBookId: number,
  currentPage: number,
): Promise<ShelfBook> => {
  const response = await api.patch(`/shelf-books/${shelfBookId}/progress`, {
    currentPage,
  });

  return response.data.data;
};
