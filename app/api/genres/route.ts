import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: { name: "asc" },
    });
    return Response.json(genres);
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return Response.json({ error: "Erro ao buscar gêneros" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validação básica
    if (!data.name || data.name.trim() === "") {
      return Response.json(
        { error: "Nome do gênero é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se já existe um gênero com esse nome
    const existingGenre = await prisma.genre.findFirst({
      where: { name: data.name.trim() }
    });

    if (existingGenre) {
      return Response.json(
        { error: "Já existe um gênero com esse nome" },
        { status: 400 }
      );
    }

    const genre = await prisma.genre.create({ 
      data: {
        name: data.name.trim()
      }
    });
    
    return Response.json(genre, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar gênero:", error);
    return Response.json({ error: "Erro ao criar gênero" }, { status: 500 });
  }
}
