import { BookAIcon, BookCheck, BookOpen } from "lucide-react";
import CardBook from "../_components/CardBook";
import Chart from "../_components/Chart";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
import prisma from "@/lib/prisma";


export default async function Dashboard() {
  const data = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  const booksAlreadyRead = data.filter((book) => book.status === "LIDO");
  const booksThatAreBeingRead = data.filter(
    (book) => book.status === "LENDO"
<<<<<<< HEAD
  );

  const totalPagesRead = booksAlreadyRead.reduce(
    (acc, act) => acc + act.pages,
    0
  );
=======
  );

  const totalPagesRead = booksAlreadyRead.reduce(
    (acc, act) => acc + act.pages,
    0
  );
=======

import { GetBooks } from "../api/data";

export default async function Dashboard() {
  const data = await GetBooks();
  const booksAlreadyRead = data.filter((book) => book.status === "LIDO");
  const booksThatAreBeingRead = data.filter((book) => book.status === "LENDO");
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480

  return (
    <div>
      <div className="flex flex-wrap items-center justify-around w-full p-3">
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
<<<<<<< HEAD
            valueInfo={totalPagesRead}
=======
<<<<<<< HEAD
            valueInfo={totalPagesRead}
=======
            valueInfo={data.length}
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Livros Cadastrados
          </h2>
<<<<<<< HEAD
          <Chart data={data as any} color="#2563eb" />
=======
<<<<<<< HEAD
          <Chart data={data as any} color="#2563eb" />
=======
          <Chart data={data} color="#2563eb" />
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Livros Lidos
          </h2>
<<<<<<< HEAD
          <Chart data={booksAlreadyRead as any} color="#16a34a" />
=======
<<<<<<< HEAD
          <Chart data={booksAlreadyRead as any} color="#16a34a" />
=======
          <Chart data={booksAlreadyRead} color="#22c55e" />
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
        </div>
      </div>
    </div>
  );
}
