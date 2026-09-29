import * as openLibraryService from "../services/open-library.service";
import * as bookRepository from "../repositories/book.repository";

const SEED_KEYWORD = "javascript";
const SEED_PAGE = 1;
const SEED_LIMIT = 20;

export const seedBooks = async (): Promise<void> => {
  console.log("Starting book seed...");

  const result = await openLibraryService.searchBooks({
    keyword: SEED_KEYWORD,
    page: SEED_PAGE,
    limit: SEED_LIMIT,
  });

  console.log(
    `Found ${result.books.length} books from Open Library`,
  );

  let created = 0;
  let updated = 0;

  for (const bookData of result.books) {
    if (!bookData.workId) {
      console.log(
        "Skip book because workId is missing",
      );

      continue;
    }

    const detail =
      await openLibraryService.getBookDetail(
        bookData.workId,
      );

    if (!detail.workId || !detail.title) {
      console.log(
        "Skip book because workId or title is missing",
      );

      continue;
    }

    const data = {
      workId: detail.workId,
      title: detail.title,
      authors: bookData.authors,
      coverId: bookData.coverId,

      coverUrl: bookData.coverId
        ? `https://covers.openlibrary.org/b/id/${bookData.coverId}-M.jpg`
        : null,

      description: detail.description,
      subjects: detail.subjects,
      firstPublishDate: detail.firstPublishDate,
      numberOfPages: detail.numberOfPages,
    };

    const existingBook =
      await bookRepository.findByWorkId(
        detail.workId,
      );

    if (existingBook) {
      await bookRepository.update(
        existingBook,
        data,
      );

      updated++;

      console.log(
        `Updated: ${detail.title}`,
      );
    } else {
      await bookRepository.create(data);

      created++;

      console.log(
        `Created: ${detail.title}`,
      );
    }
  }

  console.log("");
  console.log("Book seed completed");
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
};