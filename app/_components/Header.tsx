import { Button } from "@/components/ui/button";
import { Library, Plus } from "lucide-react";
<<<<<<< HEAD

import Image from "next/image";
import Link from "next/link";
=======
import Link from "next/link";
<<<<<<< HEAD
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="flex items-center justify-center w-full border border-b-gray-300 p-2.5">
<<<<<<< HEAD
=======
=======
export default function Header() {
  return (
    <header className="flex items-center justify-center w-full border border-gray-300 p-2.5">
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
      <div className="flex items-center justify-between w-full">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-gray-700 hover:text-blue-400"
          >
<<<<<<< HEAD
            <Image
              src="/logo.png"
              alt="Library logo"
              className="object-contain"
              width={150}
              height={150}
            />
=======
            Dashboard
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
          </Link>
        </div>
        <nav className="flex gap-2.5">
          <Button variant="ghost" className="hover:text-blue-400">
            <Link href="/library" className="flex gap-1">
              <Library /> Minha biblioteca
            </Link>
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <Link href="/add" className="flex items-center gap-1.5">
              <Plus /> Adicionar Livro
            </Link>
          </Button>
<<<<<<< HEAD
          <ThemeToggle />
=======
<<<<<<< HEAD
          <ThemeToggle />
=======
>>>>>>> 29fc341718d571fe1946c3bac7746401875947a5
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
        </nav>
      </div>
    </header>
  );
}
