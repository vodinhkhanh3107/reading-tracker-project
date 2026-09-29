const openLibraryService = require("../services/open-library.service");

const searchBooks = async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    if (currentPage < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be greater than or equal to 1",
      });
    }

    if (currentLimit < 1 || currentLimit > 20) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 20",
      });
    }

    const data = await openLibraryService.searchBooks({
      keyword: q.trim(),
      page: currentPage,
      limit: currentLimit,
    });

    console.log("Data from Open Library API:", data);

    return res.status(200).json({
      success: true,
      data: {
        total: data.total,
        page: currentPage,
        limit: currentLimit,
        books: data.books,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to search books",
    });
  }
};

module.exports = {
  searchBooks,
};