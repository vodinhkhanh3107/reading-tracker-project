import api from "./api";

export interface DashboardRecentBook {
  id: number;
  title: string;
  status: "WANT_TO_READ" | "READING" | "COMPLETED";
  currentPage: number;
  numberOfPages: number | null;
  progress: number;
  rating: number | null;
  coverUrl: string | null;
  updatedAt: string;
}

export interface DashboardData {
  totalBooks: number;
  wantToRead: number;
  reading: number;
  completed: number;
  totalPagesRead: number;
  averageRating: number | null;
  recentBooks: DashboardRecentBook[];
}

interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardResponse>("/dashboard");

  if (!response.data.success) {
    throw new Error("Cannot load dashboard data");
  }

  return response.data.data;
};