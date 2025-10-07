import { BookAIcon, BookCheck, BookOpen } from "lucide-react";
import CardBook from "../_components/CardBook";
import Chart from "../_components/Chart";
import prisma from "@/lib/prisma";


export default async function Dashboard() {
  const data = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  const booksAlreadyRead = data.filter((book) => book.status === "LIDO");
  const booksThatAreBeingRead = data.filter(
    (book) => book.status === "LENDO"
  );

  const totalPagesRead = booksAlreadyRead.reduce(
    (acc, act) => acc + act.pages,
    0
  );

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
            valueInfo={totalPagesRead}
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Livros Cadastrados
          </h2>
          <Chart data={data as any} color="#2563eb" />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Livros Lidos
          </h2>
          <Chart data={booksAlreadyRead as any} color="#16a34a" />
        </div>
      </div>
    </div>
  );
}
