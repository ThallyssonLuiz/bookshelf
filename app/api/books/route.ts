import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      include: { genre: true },
    });
    return Response.json(books);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return Response.json({ error: "Erro ao buscar livros" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validação básica dos campos obrigatórios
    if (!data.title || !data.author || !data.genreId) {
      return Response.json(
        { error: "Título, autor e gênero são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o gênero existe
    const genreExists = await prisma.genre.findUnique({
      where: { id: data.genreId }
    });

    if (!genreExists) {
      return Response.json(
        { error: "Gênero não encontrado" },
        { status: 400 }
      );
    }

    // Criar o livro
    const book = await prisma.book.create({ 
      data: {
        title: data.title,
        author: data.author,
        genreId: data.genreId,
        year_published: data.year_published || new Date().getFullYear(),
        year_registration: data.year_registration || new Date().getFullYear(),
        pages: data.pages || 0,
        rating: data.rating || 0,
        synopsis: data.synopsis || "",
        cover: data.cover || "/covers/default-cover.png",
        status: data.status || "QUERO_LER"
      },
      include: { genre: true }
    });
    
    return Response.json(book, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return Response.json({ error: "Erro ao criar livro" }, { status: 500 });
  }
}
