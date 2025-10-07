"use client";

import { DeleteBook } from "@/app/api/data";
import { Button } from "@/components/ui/button";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export function DeleteBookButton({ id }: { readonly id: string }) {

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
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        <Button variant="destructive">Excluir Livro</Button>
      </AlertDialogPrimitive.Trigger>

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 max-w-lg w-full max-h-[90vh] overflow-auto -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tem certeza?</h2>
          <p className="text-gray-600 mb-4">
            Essa ação não pode ser desfeita. O livro será permanentemente
            excluído da sua biblioteca.
          </p>

          <div className="flex justify-end gap-3">
            <AlertDialogPrimitive.Cancel className="px-4 py-2 w-full rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
              Cancelar
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              onClick={handleDelete}
              disabled={loading}
              className="px-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2Icon size={16} /> {loading ? "Excluindo..." : "Confirmar"}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
