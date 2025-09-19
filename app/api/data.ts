import { Book } from "../types/books";
import { Genre } from "../types/genres";

export async function GetBooks(): Promise<Book[]> {
  const response = await fetch("http://localhost:3000/books", {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export async function GetBookById(id: string): Promise<Book> {
  const response = await fetch(`http://localhost:3000/books/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Livro não encontrado");
  }

  const data = await response.json();
  return data;
}

export async function GetGenres(): Promise<Genre[]> {
    const response = await fetch("http://localhost:3000/genres", {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}
