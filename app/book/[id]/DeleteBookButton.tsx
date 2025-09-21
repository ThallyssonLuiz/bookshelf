"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DeleteBook } from "@/app/api/data";

interface DeleteBookButtonProps {
  id: string;
}

export function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await DeleteBook(id);
      router.push("/library");
      router.refresh();
    } catch {
      alert("Erro ao excluir o livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          Excluir Livro
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[400px] rounded-lg shadow-lg p-6 bg-white">
        <AlertDialogTitle className="text-xl font-bold text-gray-900">
          Tem certeza?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-600 mt-2">
          Essa ação não pode ser desfeita. O livro será permanentemente
          excluído da sua biblioteca.
        </AlertDialogDescription>
        <div className="flex justify-end gap-3 mt-6">
          <AlertDialogCancel className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
          >
            {loading ? "Excluindo..." : "Confirmar"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}