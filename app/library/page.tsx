import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import Link from "next/link";
import { BooksItem } from "../_components/BooksItem";
import { GetBooks, GetGenres } from "../api/data";

export default async function BooksList() {
  const books = await GetBooks();
  const genres = await GetGenres();
  return (
    <div className="flex flex-col justify-center sm:justify-start gap-6">
      <h2 className="text-2xl font-bold m-3 text-center text-gray-700">
        Sua Biblioteca
      </h2>
      <div className="flex p-4 gap-3">
        <Input
          className="border border-gray-700"
          placeholder="Filtrar por autor ou titulo..."
        />
        <Select>
          <SelectTrigger className="w-[180px] text-gray-950">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.genre}>
                {genre.genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        {books.length > 0 ? (
          books.map((book) => (
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
          <p className="text-gray-500">Nenhum livro cadastrado.</p>
        )}
      </div>
    </div>
  );
}
