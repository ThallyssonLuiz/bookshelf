import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "../types/books"; 

interface BooksListProps {
  books: Book[];
}

export default function BooksList({ books }: Readonly<BooksListProps>) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <Card key={book.id} className="w-64 max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="relative h-48 w-full">
              <Image 
                src={book.cover || '/images/default-cover.png'}
                alt={`Capa do livro ${book.title}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg text-gray-800 truncate">{book.title}</h3>
              <p className="text-sm text-gray-600 truncate">{book.author}</p>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {book.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">Nenhum livro cadastrado.</p>
      )}
    </div>
  );
}