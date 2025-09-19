import { Book } from "../types/books";
import { Genre } from "../types/genres";

const API_URL = "http://localhost:3000";

export async function GetBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`, { cache: "no-store" });
  if (!response.ok) throw new Error("Erro ao buscar livros");
  return response.json();
}

export async function GetBookById(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Livro não encontrado");
  return response.json();
}

export async function CreateBook(book: Partial<Book>): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error("Erro ao criar livro");
  return response.json();
}

export async function UpdateBook(id: string, book: Partial<Book>): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error("Erro ao atualizar livro");
  return response.json();
}

export async function DeleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao excluir livro");
}

export async function GetGenres(): Promise<Genre[]> {
  const response = await fetch(`${API_URL}/genres`, { cache: "no-store" });
  if (!response.ok) throw new Error("Erro ao buscar gêneros");
  return response.json();
}

export async function CreateGenre(genre: Partial<Genre>): Promise<Genre> {
  const response = await fetch(`${API_URL}/genres`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });
  if (!response.ok) throw new Error("Erro ao criar gênero");
  return response.json();
}

export async function UpdateGenre(id: string, genre: Partial<Genre>): Promise<Genre> {
  const response = await fetch(`${API_URL}/genres/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });
  if (!response.ok) throw new Error("Erro ao atualizar gênero");
  return response.json();
}

export async function DeleteGenre(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/genres/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao excluir gênero");
}
