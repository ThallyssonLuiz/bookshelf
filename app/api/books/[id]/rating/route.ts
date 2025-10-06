import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  try {
    const { rating } = await request.json();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "ID do livro é obrigatório." },
        { status: 400 }
      );
    }

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

    // Validar rating
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return NextResponse.json(
        { error: "Rating deve ser um número entre 0 e 5." },
        { status: 400 }
      );
    }

    const updated = await prisma.book.update({
      where: { id },
      data: { rating },
      include: { genre: true }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar rating:", error);
    return NextResponse.json({ error: "Erro ao atualizar rating" }, { status: 500 });
  }
}
