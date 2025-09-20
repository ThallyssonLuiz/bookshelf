"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BooksItem } from "../_components/BooksItem";
import { GetBooks, GetGenres } from "../api/data";
import { Book } from "../types/books";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<{ id: number; genre: string }[]>([]);
  const [value, setValue] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    async function fetchData() {
      const booksData = await GetBooks();
      const genresData = await GetGenres();
      setBooks(booksData);
      setGenres(
        genresData.map((genre: any) => ({
          id: Number(genre.id),
          genre: genre.genre || `Genero-${genre.id}`,
        }))
      );
    }
    fetchData();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(value.toLowerCase()) ||
      book.author.toLowerCase().includes(value.toLowerCase());

    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="flex flex-col justify-center sm:justify-start gap-6">
      <h2 className="text-2xl font-bold m-3 text-center text-gray-700">
        Sua Biblioteca
      </h2>

      <div className="flex p-4 gap-3">
        <Input
          className="border border-gray-700"
          placeholder="Filtrar por autor ou título..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Select
          value={selectedGenre}
          onValueChange={(val) => setSelectedGenre(val)}
        >
          <SelectTrigger className="w-[180px] text-gray-950">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            {genres.map((genre) => (
              <SelectItem
                key={genre.id}
                value={genre.genre || String(genre.id)}
              >
                {genre.genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <BooksItem
                title={book.title}
                author={book.author}
                cover={book?.cover}
                id={book.id}
                status={book.status}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500">Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}
