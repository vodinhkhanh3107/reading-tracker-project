export interface Book {
  workId: string;
  title: string;
  authors: string[];
  coverId: number | null;
  coverUrl: string | null;
  description: string | null;
  subjects: string[];
  firstPublishDate: string | null;
  numberOfPages: number | null;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface SearchBooksParams {
  keyword: string;
  page?: number;
  limit?: number;
}

export interface SearchBooksResult {
  total: number;
  page: number;
  limit: number;
  books: Book[];
}