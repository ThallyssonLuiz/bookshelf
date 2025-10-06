import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "ID do livro é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      return NextResponse.json(
        { error: "Livro não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar livro." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const { id } = await params;
  
  if (!id) {
    return NextResponse.json(
      { error: "ID do livro é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();
    
    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Livro não encontrado." },
        { status: 404 }
      );
    }

    // Se está atualizando o gênero, verificar se existe
    if (data.genreId) {
      const genreExists = await prisma.genre.findUnique({
        where: { id: data.genreId }
      });

      if (!genreExists) {
        return NextResponse.json(
          { error: "Gênero não encontrado." },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.book.update({
      where: { id },
      data,
      include: { genre: true }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return NextResponse.json({ error: "Erro ao atualizar livro" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const { id } = await params;
  
  if (!id) {
    return NextResponse.json(
      { error: "ID do livro é obrigatório." },
      { status: 400 }
    );
  }

  try {
    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Livro não encontrado." },
        { status: 404 }
      );
    }

    await prisma.book.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return NextResponse.json({ error: "Erro ao deletar livro" }, { status: 500 });
  }
}
