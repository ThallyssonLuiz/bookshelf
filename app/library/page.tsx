"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BooksItem } from "../_components/BooksItem";
import { GetBooks, GetGenres } from "../api/data";
import { Book } from "../types/books";
import { Genre } from "../types/genres";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [booksData, genresData] = await Promise.all([
          GetBooks(),
          GetGenres()
        ]);
        setBooks(booksData);
        setGenres(genresData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar dados da biblioteca");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtro dos livros
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = genreFilter === "all" || book.genreId === genreFilter;

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Carregando biblioteca...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center sm:justify-start gap-6">
      <div className="flex justify-between items-center m-3">
        <h2 className="text-2xl font-bold text-gray-700">
          Sua Biblioteca
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row p-4 gap-3">
        <Input
          className="border border-gray-700 flex-1"
          placeholder="Filtrar por autor ou título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={genreFilter} onValueChange={setGenreFilter}>
          <SelectTrigger className="w-full sm:w-[200px] text-gray-950">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id}>
                {genre.name}
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
                cover={book.cover || "/covers/default-cover.png"}
                id={book.id}
                status={book.status}
                rating={book.rating}
              />
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {search || genreFilter !== "all" 
                ? "Nenhum livro encontrado com os filtros aplicados." 
                : "Sua biblioteca está vazia."}
            </p>
            {(!search && genreFilter === "all") && (
              <Link href="/add">
                <Button className="bg-green-600 hover:bg-green-700">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Adicionar seu primeiro livro
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      {filteredBooks.length > 0 && (
        <div className="text-center text-gray-500 mt-6">
          Mostrando {filteredBooks.length} de {books.length} livros
        </div>
      )}
    </div>
  );
}
