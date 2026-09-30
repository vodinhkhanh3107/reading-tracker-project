import api from "./api";

import type { ApiResponse } from "../types/api";

import type {
  SearchBooksParams,
  SearchBooksResult,
  Book,
  Pagination,
} from "../types/book";

export const getBooks = async ({ page = 1, limit = 20 }: Pagination) => {
  const response = await api.get<ApiResponse<SearchBooksResult>>(
    "/books",
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data.data;
};

export const searchBooks = async (
  params: SearchBooksParams,
): Promise<SearchBooksResult> => {
  const response = await api.get<ApiResponse<SearchBooksResult>>(
    "/books/search",
    {
      params: {
        q: params.keyword,
        page: params.page ?? 1,
        limit: params.limit ?? 20,
      },
    },
  );

  return response.data.data;
};

export const getBookDetail = async (workId: string): Promise<Book> => {
  const response = await api.get<ApiResponse<Book>>(`/books/${workId}`);

  return response.data.data;
};
