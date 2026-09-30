import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";

const repository = AppDataSource.getRepository(Book);

export interface CreateBookData {
  workId: string;
  title: string;
  authors: string[] | null;
  coverId: number | null;
  coverUrl: string | null;
  description: string | null;
  subjects: string[] | null;
  firstPublishDate: string | null;
  numberOfPages: number | null;
}

export const search = async (
  keyword: string,
  page: number,
  limit: number,
): Promise<{
  books: Book[];
  total: number;
}> => {
  const [books, total] = await repository
    .createQueryBuilder("book")
    .where("book.title LIKE :keyword", {
      keyword: `%${keyword}%`,
    })
    .orWhere("book.workId LIKE :keyword", {
      keyword: `%${keyword}%`,
    })
    .orderBy("book.title", "ASC")
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    books,
    total,
  };
};

export const findById = async (
  id: number,
): Promise<Book | null> => {
  return repository.findOne({
    where: {
      id,
    },
    relations: {
      shelfBook: true,
    },
  });
};


export const findByWorkId = async (
  workId: string,
): Promise<Book | null> => {
  return repository.findOne({
    where: {
      workId,
    },
  });
};

export const findAll = async (
  page: number,
  limit: number,
): Promise<{
  books: Book[];
  total: number;
}> => {
  const [books, total] = await repository.findAndCount({
    order: {
      title: "ASC",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    books,
    total,
  };
};

export const create = async (
  data: CreateBookData,
): Promise<Book> => {
  const book = repository.create(data);

  return repository.save(book);
};

export const update = async (
  book: Book,
  data: Partial<Book>,
): Promise<Book> => {
  repository.merge(book, data);

  return repository.save(book);
};

export const remove = async (
  book: Book,
): Promise<void> => {
  await repository.remove(book);
};