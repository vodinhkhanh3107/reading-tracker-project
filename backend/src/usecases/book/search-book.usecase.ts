import * as openLibraryService from "../../services/open-library.service";

interface searchBooksParams {
  keyword: string;
  page: number;
  limit: number;
}

export const searchBooks = async ({
  keyword,
  page,
  limit,
}: searchBooksParams) => {
  if (!keyword || !keyword.trim()) {
    throw new Error("Keyword is required");
  }

  if (page < 1) {
    throw new Error("Page must be greater than 0");
  }

  if (limit < 1 || limit > 20) {
    throw new Error("Limit must be between 1 and 20");
  }

  const data = await openLibraryService.searchBooks({
    keyword: keyword.trim(),
    page,
    limit,
  });
  return {
    total: data.total,
    page,
    limit,
    books: data.books,
  };
};