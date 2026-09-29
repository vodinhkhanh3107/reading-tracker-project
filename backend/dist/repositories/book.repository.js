import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";
const repository = AppDataSource.getRepository(Book);
export const findByWorkId = async (workId) => {
    return repository.findOne({
        where: {
            workId,
        },
    });
};
export const create = async (data) => {
    const book = repository.create(data);
    return repository.save(book);
};
export const update = async (book, data) => {
    repository.merge(book, data);
    return repository.save(book);
};
//# sourceMappingURL=book.repository.js.map