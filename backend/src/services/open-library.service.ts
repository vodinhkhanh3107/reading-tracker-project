import axios from "axios";

const openLibraryApi = axios.create({
  baseURL: process.env.OPEN_LIBRARY_BASE_URL,
  timeout: 10000,
});


interface SearchBooksParams {
  keyword: string;
  page: number;
  limit: number;
}

interface OpenLibrarySearchBook {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface OpenLibrarySearchResponse {
  numFound: number;
  docs: OpenLibrarySearchBook[];
}

interface BookSearchResult {
  workId: string | null;
  title: string | null;
  authors: string[];
  firstPublishYear: number | null;
  coverId: number | null;
}


interface BookDetailResponse {
  key?: string;
  title?: string;
  description?: string | {
    value?: string;
  };
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
  number_of_pages?: number;
}

interface BookDetailResult {
  workId: string | null;
  title: string | null;
  description: string | null;
  coverIds: number[];
  subjects: string[];
  firstPublishDate: string | null;
  numberOfPages: number | null;
}


export const searchBooks = async ({ keyword, page, limit }: SearchBooksParams) => {
  const response = await openLibraryApi.get<OpenLibrarySearchResponse>("/search.json", {
    params: {
      q: keyword,
      page,
      limit,
    },
  });

  const { numFound, docs } = response.data;


  const books = docs.map((book) => ({
    workId: book.key?.replace("/works/", ""),
    title: book.title,
    authors: book.author_name || [],
    firstPublishYear: book.first_publish_year || null,
    coverId: book.cover_i || null,
  }));

  return {
    total: numFound,
    books,
  };
};

export const getBookDetail = async (workId: string): Promise<BookDetailResult> => {
  const response = await openLibraryApi.get<BookDetailResponse>(`/works/${workId}.json`);

  const book = response.data;

  return {
    workId: book.key?.replace("/works/", "") ?? null,
    title: book.title ?? null,
    description:
      typeof book.description === "string"
        ? book.description
        : book.description?.value || null,

    coverIds: book.covers || [],

    subjects: book.subjects || [],

    firstPublishDate: book.first_publish_date || null,

    numberOfPages: book.number_of_pages || null,
  };
};

