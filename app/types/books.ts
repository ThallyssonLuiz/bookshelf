export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year_published: number;
  year_registration: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
  status: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";
}
