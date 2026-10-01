import { AppDataSource } from "../config/database";
import { ShelfBook } from "../entities/ShelfBook";
const repository = AppDataSource.getRepository(ShelfBook);
export const findById = async (id) => {
    return repository.findOne({
        where: {
            id,
        },
        relations: {
            book: true,
        },
    });
};
export const findByBookId = async (bookId) => {
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
export const findAll = async () => {
    return repository.find({
        relations: {
            book: true,
        },
        order: {
            createdAt: "DESC",
        },
    });
};
export const findByStatus = async (status) => {
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
export const create = async (data) => {
    const shelfBook = repository.create(data);
    return repository.save(shelfBook);
};
export const update = async (shelfBook, data) => {
    repository.merge(shelfBook, data);
    return repository.save(shelfBook);
};
export const remove = async (shelfBook) => {
    await repository.remove(shelfBook);
};
//# sourceMappingURL=shelf-book.repository.js.map