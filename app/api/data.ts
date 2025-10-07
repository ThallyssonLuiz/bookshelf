import { Book } from "../types/books";
import { Genre } from "../types/genres";

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

//atualizar o rating
export async function UpdateBookRating(id: string, rating: number) {
  const response = await fetch(`/api/books/${id}/rating`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar o rating do livro");
  }

  return response.json();
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
}
