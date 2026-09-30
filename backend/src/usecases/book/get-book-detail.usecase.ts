import * as bookRepository from "../../repositories/book.repository";


export const getBookDetail = async (workId: string) => {
    if (!workId || !workId.trim()) {
    throw new Error("Work ID is required");
  }
  const bookDetail = await bookRepository.findByWorkId(workId);
  return bookDetail;
};