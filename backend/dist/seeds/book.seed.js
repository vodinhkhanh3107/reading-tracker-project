import * as openLibraryService from "../services/open-library.service";
import * as bookRepository from "../repositories/book.repository";
const SEED_KEYWORD = "javascript";
const SEED_PAGE = 1;
const SEED_LIMIT = 20;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const seedBooks = async () => {
    console.log("Starting book seed...");
    const result = await openLibraryService.searchBooks({
        keyword: SEED_KEYWORD,
        page: SEED_PAGE,
        limit: SEED_LIMIT,
    });
    console.log(`Found ${result.books.length} books from Open Library`);
    let created = 0;
    let skipped = 0;
    for (const bookData of result.books) {
        if (!bookData.workId) {
            console.log("Skip book: missing workId");
            skipped++;
            continue;
        }
        try {
            const detail = await openLibraryService.getBookDetail(bookData.workId);
            if (!detail.workId || !detail.title) {
                console.log("Skip book: missing workId or title");
                skipped++;
                continue;
            }
            // Ưu tiên số trang từ Work detail nếu có.
            // Nếu không có, tìm một Edition có số trang.
            let numberOfPages = detail.numberOfPages;
            if (!Number.isInteger(numberOfPages) ||
                numberOfPages === null ||
                numberOfPages <= 0) {
                numberOfPages =
                    await openLibraryService.getNumberOfPages(detail.workId);
            }
            // Chỉ seed sách có số trang hợp lệ.
            if (!Number.isInteger(numberOfPages) ||
                numberOfPages === null ||
                numberOfPages <= 0) {
                console.log(`Skip book without page count: ${detail.title}`);
                skipped++;
                await delay(1000);
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
                numberOfPages,
            };
            const existingBook = await bookRepository.findByWorkId(detail.workId);
            if (existingBook) {
                await bookRepository.update(existingBook, data);
                console.log(`Updated: ${detail.title}`);
            }
            else {
                await bookRepository.create(data);
                console.log(`Created: ${detail.title} - ${numberOfPages} pages`);
            }
            created++;
            await delay(1000);
        }
        catch (error) {
            console.error(`Failed to seed ${bookData.workId}:`, error);
            skipped++;
            await delay(1000);
        }
    }
    console.log("");
    console.log("Book seed completed");
    console.log(`Processed: ${created}`);
    console.log(`Skipped: ${skipped}`);
};
//# sourceMappingURL=book.seed.js.map