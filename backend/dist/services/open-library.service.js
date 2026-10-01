import axios from "axios";
const openLibraryApi = axios.create({
    baseURL: process.env.OPEN_LIBRARY_BASE_URL,
    timeout: 10000,
});
export const searchBooks = async ({ keyword, page, limit }) => {
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
export const getBookDetail = async (workId) => {
    const response = await openLibraryApi.get(`/works/${workId}.json`);
    const book = response.data;
    return {
        workId: book.key?.replace("/works/", "") ?? null,
        title: book.title ?? null,
        description: typeof book.description === "string"
            ? book.description
            : book.description?.value || null,
        coverIds: book.covers || [],
        subjects: book.subjects || [],
        firstPublishDate: book.first_publish_date || null,
        numberOfPages: book.number_of_pages || null,
    };
};
export const getNumberOfPages = async (workId) => {
    try {
        const response = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`, {
            params: {
                limit: 20,
            },
        });
        const edition = response.data.entries?.find((item) => Number.isInteger(item.number_of_pages) &&
            item.number_of_pages > 0);
        return edition?.number_of_pages ?? null;
    }
    catch (error) {
        console.error(`Failed to get editions for ${workId}:`, error);
        return null;
    }
};
//# sourceMappingURL=open-library.service.js.map