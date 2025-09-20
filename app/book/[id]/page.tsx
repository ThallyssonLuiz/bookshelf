import { GetBookById } from "@/app/api/data";
import { Book } from "@/app/types/books";

interface BookPageParams {
  params: {
    id: string;
  };
}

export default async function BookPage({ params }: Readonly<BookPageParams>) {
  
  const { id } = params;
  const book: Book = await GetBookById(id);

  if (!book) {
    return <div className="p-6 text-red-500">Livro não encontrado</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg">
        <span className="font-semibold">Autor:</span> {book.author}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Gênero:</span> {book.genre}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Ano:</span> {book.year_published}
      </p>

      {book.synopsis && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Descrição</h2>
          <p className="text-gray-700 mt-2">{book.synopsis}</p>
        </div>
      )}
    </div>
  );
}
