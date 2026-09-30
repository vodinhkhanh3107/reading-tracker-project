import type { Book } from "./book";

export type ReadingStatus =
  | "WANT_TO_READ"
  | "READING"
  | "COMPLETED";

export interface ShelfBook {
  id: number;

  book: Book;

  status: ReadingStatus;

  currentPage: number;

  rating: number | null;

  note: string | null;

  startedAt: string | null;

  finishedAt: string | null;
}