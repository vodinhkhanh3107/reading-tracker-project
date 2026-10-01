import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";
const repository = AppDataSource.getRepository(Book);
export const search = async (keyword, page, limit) => {
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
export const findById = async (id) => {
    return repository.findOne({
        where: {
            id,
        },
        relations: {
            shelfBook: true,
        },
    });
};
export const findByWorkId = async (workId) => {
    return repository.findOne({
        where: {
            workId,
        },
    });
};
export const findAll = async (page, limit) => {
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
export const create = async (data) => {
    const book = repository.create(data);
    return repository.save(book);
};
export const update = async (book, data) => {
    repository.merge(book, data);
    return repository.save(book);
};
export const remove = async (book) => {
    await repository.remove(book);
};
//# sourceMappingURL=book.repository.js.map