const axios = require("axios");

const openLibraryApi = axios.create({
  baseURL: process.env.OPEN_LIBRARY_BASE_URL,
  timeout: 10000,
});

const searchBooks = async ({ keyword, page, limit }) => {
  const response = await openLibraryApi.get("/search.json", {
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

module.exports = {
  searchBooks,
};
