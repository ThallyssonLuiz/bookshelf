import { BookAIcon, BookCheck, BookOpen } from "lucide-react";
import CardBook from "../_components/CardBook";
import { Book } from "../types/books";

export default async function Dashboard() {
  const response = await fetch("http://localhost:3000/books", {
    cache: "no-store",
  });
  const data = await response.json();
  const booksThatAreBeingRead = data.filter(
    (book: Book) => book.status === "LENDO"
  );
  const booksAlreadyRead = data.filter((book: Book) => book.status === "LIDO");

  return (
    <div className="flex items-center justify-around w-full p-3">
      <div className="flex w-full gap-2">
        <CardBook
          Icon={BookAIcon}
          bgColorIcon="bg-blue-500"
          title={data.length > 1 ? "Total de livros" : "Total de livro"}
          valueInfo={data.length}
        />
        <CardBook
          Icon={BookOpen}
          bgColorIcon="bg-orange-500"
          title={
            booksThatAreBeingRead.length > 1
              ? "Livros sendo lidos atualmente"
              : "Livro sendo lido atualmente"
          }
          valueInfo={booksThatAreBeingRead.length}
        />
        <CardBook
          Icon={BookCheck}
          bgColorIcon="bg-green-500"
          title={
            booksAlreadyRead.length > 1
              ? "Livros já finalizados"
              : "Livro já finalizado"
          }
          valueInfo={booksAlreadyRead.length}
        />
        <CardBook
          Icon={BookOpen}
          bgColorIcon="bg-purple-500"
          title={
            booksAlreadyRead.length > 1
              ? "Total de páginas lidas"
              : "Total de página lida"
          }
          valueInfo={data.length}
        />
      </div>
    </div>
  );
}
