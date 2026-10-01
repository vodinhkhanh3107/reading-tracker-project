import * as dashboardRepository from "../../repositories/dashboard.repository"

export const getDashboardUseCase = async () => {
  const [stats, shelfBooks] = await Promise.all([
    dashboardRepository.getDashboardStats(),
    dashboardRepository.getRecentBooks(5),
  ]);

  const recentBooks = shelfBooks.map((shelfBook) => {
    const book = shelfBook.book;
    const totalPages = book.numberOfPages ?? 0;

    const progress =
      totalPages > 0
        ? Math.min(
            100,
            Math.round((shelfBook.currentPage / totalPages) * 100),
          )
        : 0;

    return {
      id: shelfBook.id,
      title: book.title,
      status: shelfBook.status,
      currentPage: shelfBook.currentPage,
      numberOfPages: book.numberOfPages,
      progress,
      rating: shelfBook.rating,
      coverUrl: book.coverUrl,
      updatedAt: shelfBook.updatedAt,
    };
  });

  return {
    ...stats,
    recentBooks,
  };
};