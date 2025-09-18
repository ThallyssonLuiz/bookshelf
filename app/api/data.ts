import { Book } from "../types/books";

export async function GetBooks() {
  const response = await fetch("http://localhost:3000/books", {
    cache: "no-store",
  });
  const data: Book[] = await response.json();
  return data;
}
