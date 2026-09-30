import { AppDataSource } from "../config/database";
import { ShelfBook, ReadingStatus } from "../entities/ShelfBook";

const repository = AppDataSource.getRepository(ShelfBook);

export interface CreateShelfBookData {
  bookId: number;
  status?: ReadingStatus;
  currentPage?: number;
  rating?: number | null;
  note?: string | null;
  startedAt?: Date | null;
  finishedAt?: Date | null;
}

export const findById = async (id: number): Promise<ShelfBook | null> => {
  return repository.findOne({
    where: {
      id,
    },
    relations: {
      book: true,
    },
  });
};

export const findByBookId = async (
  bookId: number,
): Promise<ShelfBook | null> => {
  return repository.findOne({
    where: {
      book: {
        id: bookId,
      },
    },
    relations: {
      book: true,
    },
  });
};

export const findAll = async (): Promise<ShelfBook[]> => {
  return repository.find({
    relations: {
      book: true,
    },
    order: {
      createdAt: "DESC",
    },
  });
};

export const findByStatus = async (
  status: ReadingStatus,
): Promise<ShelfBook[]> => {
  return repository.find({
    where: {
      status,
    },
    relations: {
      book: true,
    },
    order: {
      updatedAt: "DESC",
    },
  });
};

export const create = async (data: CreateShelfBookData): Promise<ShelfBook> => {
  const shelfBook = repository.create({
    book: {
      id: data.bookId,
    },
    status: data.status ?? ReadingStatus.WANT_TO_READ,
    currentPage: data.currentPage ?? 0,
    rating: data.rating ?? null,
    note: data.note ?? null,
    startedAt: data.startedAt ?? null,
    finishedAt: data.finishedAt ?? null,
  });

  return repository.save(shelfBook);
};

export const update = async (
  shelfBook: ShelfBook,
  data: Partial<ShelfBook>,
): Promise<ShelfBook> => {
  repository.merge(shelfBook, data);

  return repository.save(shelfBook);
};

export const remove = async (shelfBook: ShelfBook): Promise<void> => {
  await repository.remove(shelfBook);
};
