import { BooksItem } from "../_components/BooksItem";
import { GetBooks } from "../api/data";

export default async function BooksList() {
  const books = await GetBooks();
  return (
    <div className="flex flex-col justify-center sm:justify-start gap-6">
      <h2 className="text-2xl font-bold m-3 text-center text-gray-700">
        Sua Biblioteca
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <BooksItem
              key={book.id}
              title={book.title}
              author={book.author}
              cover={book?.cover}
              id={book.id}
              status={book.status}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum livro cadastrado.</p>
        )}
      </div>
    </div>
  );
}
