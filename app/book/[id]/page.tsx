"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetBookById } from "@/app/api/data";
import { Book } from "@/app/types/books";
import { DeleteBookButton } from "./DeleteBookButton";
import EditBookButton from "./EditBookButton";

export default function BookPage() {
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    GetBookById(id)
      .then(setBook)
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6 text-gray-600">Carregando livro...</div>;
  if (!book) return <div className="p-6 text-red-500">Livro não encontrado</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {book.cover && <img src={book.cover} alt={`Capa do livro ${book.title}`} className="object-cover w-[250px] h-[350px]" />}

      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="text-lg"><span className="font-semibold">Autor:</span> {book.author}</p>
        <p className="text-lg"><span className="font-semibold">Gênero:</span> {book.genre}</p>
        <p className="text-lg"><span className="font-semibold">Ano:</span> {book.year_published}</p>
        <p className="text-lg"><span className="font-semibold">Páginas:</span> {book.pages}</p>
        <p className="text-lg mt-2"><span className="font-semibold">Status:</span> {book.status}</p>
        {book.synopsis && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Descrição</h2>
            <p className="text-gray-700 mt-2">{book.synopsis}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-2">
          <EditBookButton initialBook={book} onUpdate={setBook} />
          <DeleteBookButton id={book.id} />
        </div>
      </div>
    </div>
  );
}