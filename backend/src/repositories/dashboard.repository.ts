
import { AppDataSource } from "../config/database";
import { ShelfBook } from "../entities/ShelfBook";

export const getDashboardStats = async () => {
  const repository = AppDataSource.getRepository(ShelfBook);

  const rows = await repository
    .createQueryBuilder("shelfBook")
    .select("shelfBook.status", "status")
    .addSelect("COUNT(shelfBook.id)", "count")
    .groupBy("shelfBook.status")
    .getRawMany<{ status: string; count: string }>();

  const totalBooks = await repository.count();

  const pageResult = await repository
    .createQueryBuilder("shelfBook")
    .select(
      "COALESCE(SUM(shelfBook.currentPage), 0)",
      "totalPagesRead",
    )
    .addSelect(
      "AVG(shelfBook.rating)",
      "averageRating",
    )
    .getRawOne<{
      totalPagesRead: string;
      averageRating: string | null;
    }>();

  const statusCounts = {
    WANT_TO_READ: 0,
    READING: 0,
    COMPLETED: 0,
  };

  for (const row of rows) {
    if (row.status in statusCounts) {
      statusCounts[
        row.status as keyof typeof statusCounts
      ] = Number(row.count);
    }
  }

  return {
    totalBooks,
    wantToRead: statusCounts.WANT_TO_READ,
    reading: statusCounts.READING,
    completed: statusCounts.COMPLETED,
    totalPagesRead: Number(pageResult?.totalPagesRead ?? 0),
    averageRating:
      pageResult?.averageRating == null
        ? null
        : Number(Number(pageResult.averageRating).toFixed(1)),
  };
};

export const getRecentBooks = async (limit = 5) => {
  const repository = AppDataSource.getRepository(ShelfBook);

  return repository.find({
    relations: {
      book: true,
    },
    order: {
      updatedAt: "DESC",
    },
    take: limit,
  });
};