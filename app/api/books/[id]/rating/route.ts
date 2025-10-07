import prisma from "@/lib/prisma"; // ou o caminho do seu client
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { rating } = await req.json();

    const updated = await prisma.book.update({
      where: { id },
      data: { rating },
      include: { genre: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar rating:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar rating" },
      { status: 500 }
    );
  }
}
