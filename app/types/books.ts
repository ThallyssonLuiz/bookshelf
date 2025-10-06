export interface Book {
  id: string;
  title: string;
  author: string;
  genreId: string;
  genre?: {
    id: string;
    name: string;
  };
  year_published: number;
  year_registration: number;
  pages: number;
  rating: number;
  synopsis: string | null;
  cover: string | null;
  status: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";
  createdAt?: Date;
  updatedAt?: Date;
}
