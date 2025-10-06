import { Book } from "../types/books";
import { Genre } from "../types/genres";

<<<<<<< HEAD
export async function GetBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`/api/books`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw new Error("Erro ao buscar livros");
  }
}

export async function GetBookById(id: string): Promise<Book> {
  try {
    const response = await fetch(`/api/books/${id}`, { cache: "no-store" });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Livro não encontrado");
      }
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    throw error;
  }
}

export async function CreateBook(book: Partial<Book>): Promise<Book> {
  try {
    const response = await fetch(`/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    throw error;
  }
}

export async function UpdateBook(
  id: string,
  book: Partial<Book>
): Promise<Book> {
  try {
    const response = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    throw error;
  }
}

export async function DeleteBook(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/books/${id}`, { method: "DELETE" });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    throw error;
  }
}

export async function GetGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(`/api/genres`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    throw new Error("Erro ao buscar gêneros");
  }
}

export async function CreateGenre(genre: Partial<Genre>): Promise<Genre> {
  try {
    const response = await fetch(`/api/genres`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genre),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Erro ao criar gênero:", error);
    throw error;
  }
}

export async function UpdateGenre(
  id: string,
  genre: Partial<Genre>
): Promise<Genre> {
  try {
    const response = await fetch(`/api/genres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genre),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Erro ao atualizar gênero:", error);
    throw error;
  }
}

export async function DeleteGenre(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/genres/${id}`, { method: "DELETE" });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao excluir gênero:", error);
    throw error;
  }
=======
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
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
}
