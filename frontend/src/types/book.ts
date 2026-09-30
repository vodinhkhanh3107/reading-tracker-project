export interface Book {
  workId: string;
  title: string;
  authors: string[];
  coverUrl: string | null;
  description: string;
  subjects: string[];
  firstPublishDate: string | null;
  numberOfPages: number | null;
}