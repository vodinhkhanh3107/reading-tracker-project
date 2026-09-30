import axios from "axios";
import * as openLibraryService from "../../services/open-library.service";



export const getBookDetail = async (workId?: string) => {
  if (!workId || !workId.trim()) {
    throw new Error("Work ID is required");
  }

  try {
    return await openLibraryService.getBookDetail(workId.trim());
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Book not found");
    }

    throw new Error("Failed to get book detail");
  }
};