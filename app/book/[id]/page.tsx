"use client";

import Rating from "@/app/_components/Rating";
import { GetBookById, UpdateBookRating } from "@/app/api/data";
import { Book } from "@/app/types/books";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteBookButton } from "./DeleteBookButton";
import EditBookButton from "./EditBookButton";

export default function BookPage() {
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    GetBookById(id)
      .then(setBook)
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="p-6 text-gray-600">Carregando livro...</div>;
  if (!book)
    return <div className="p-6 text-red-500">Livro não encontrado</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mt-6 w-[100%] flex">
        <div className="w-full">
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <div className="flex items-center gap-2.5">
              <Rating
                assessment={book.rating}
                handleChange={async (newRating) => {
                  setRating(newRating);

                  try {
                    const updated = await UpdateBookRating(book.id, newRating);
                    setBook(updated);
                  } catch (error) {
                    console.error("Erro ao atualizar rating:", error);
                    alert("Erro ao atualizar avaliação");
                  }
                }}
              />{" "}
              <span className={`${book.rating > 3 ? "text-green-700": "text-red-700"} font-bold`} >{book.rating}</span>
            </div>
          </div>
          <p className="text-lg">
            <span className="font-semibold">Autor:</span> {book.author}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Gênero:</span>{" "}
            {book.genre?.name || "Não informado"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Ano:</span> {book.year_published}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Páginas:</span> {book.pages}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Status:</span> {book.status}
          </p>
          {book.synopsis && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Descrição</h2>
              <p className="text-gray-700 mt-2">{book.synopsis}</p>
            </div>
          )}

          <div className="mt-10 flex w-full gap-2">
            <EditBookButton initialBook={book} onUpdate={setBook} />
            <DeleteBookButton id={book.id} />
          </div>
        </div>
        <div>
          {book.cover && (
            <img
              src={book.cover}
              alt={`Capa do livro ${book.title}`}
              className="object-cover w-[250px] h-[350px] rounded "
            />
          )}
        </div>
      </div>
    </div>
  );
}
