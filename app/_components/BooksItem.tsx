import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
<<<<<<< HEAD
import Rating from "./Rating";
=======
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5

interface BooksItemProps {
  id: string;
  cover: string;
  title: string;
  author: string;
  status: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";
}

const statusStyle: Record<
  BooksItemProps["status"],
  { bgColor: string; textColor: string }
> = {
  QUERO_LER: { bgColor: "bg-blue-100", textColor: "text-blue-800" },
  LIDO: { bgColor: "bg-green-100", textColor: "text-green-800" },
  LENDO: { bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
  PAUSADO: { bgColor: "bg-orange-100", textColor: "text-orange-800" },
  ABANDONADO: { bgColor: "bg-red-100", textColor: "text-red-800" },
};

export function BooksItem({
  cover,
  title,
  author,
  status,
}: Readonly<BooksItemProps>) {
<<<<<<< HEAD
  const style = statusStyle[status] || {
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  };
=======
  const style = statusStyle[status] || { bgColor: "bg-gray-100", textColor: "text-gray-800" };
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
  return (
    <Card className="pt-0 w-64 max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative h-48 w-full">
        <Image
          src={cover || "/covers/default-cover.png"}
          alt={`Capa do livro ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
<<<<<<< HEAD
        <Rating />
=======
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
        <h3 className="font-bold text-lg text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-600 truncate">{author}</p>
        <div className="mt-2">
          <span
            className={`inline-block ${style.bgColor} ${style.textColor} text-xs font-semibold px-2.5 py-0.5 rounded-full`}
          >
            {status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
