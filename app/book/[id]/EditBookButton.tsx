"use client";

import { UpdateBook } from "@/app/api/data";
import { Book } from "@/app/types/books";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pen, SaveIcon } from "lucide-react";
import { useState } from "react";

interface EditBookButtonProps {
  initialBook: Book;
  onUpdate: (updatedBook: Book) => void;
}

export default function EditBookButton({
  initialBook,
  onUpdate,
}: Readonly<EditBookButtonProps>) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: initialBook.title,
    author: initialBook.author,
    genreId: initialBook.genreId,
    yearPublished: initialBook.year_published,
    pages: initialBook.pages,
    status: initialBook.status,
    synopsis: initialBook.synopsis || "",
    cover: initialBook.cover || "",
    year_registration: initialBook.year_registration,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleCancel = () => {
    setForm({
      title: initialBook.title,
      author: initialBook.author,
      genreId: initialBook.genreId,
      yearPublished: initialBook.year_published,
      pages: initialBook.pages,
      status: initialBook.status,
      synopsis: initialBook.synopsis || "",
      cover: initialBook.cover || "",
      year_registration: initialBook.year_registration,
    });
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated: Partial<Book> = {
        title: form.title,
        author: form.author,
        genreId: form.genreId,
        year_published: form.yearPublished,
        pages: form.pages,
        status: form.status,
        synopsis: form.synopsis,
        cover: form.cover,
        year_registration: form.year_registration,
      };
      const result = await UpdateBook(initialBook.id, updated);
      onUpdate(result);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar livro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="bg-yellow-600 hover:bg-yellow-700"
        onClick={() => setOpen(true)}
      >
        <Pen className="mr-2 h-4 w-4" /> Editar Livro
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Livro</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <span>Título:</span>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Título"
            />
            <span>Autor:</span>
            <Input
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Autor"
            />
            <span>Gênero</span>
            <Input
              value={form.genreId}
              onChange={(e) => handleChange("genreId", e.target.value)}
              placeholder="ID do Gênero"
            />
            <span>Ano de publicação:</span>
            <Input
              type="number"
              value={form.yearPublished}
              onChange={(e) =>
                handleChange("yearPublished", Number(e.target.value))
              }
              placeholder="Ano"
            />
            <span>Número de páginas:</span>
            <Input
              type="number"
              value={form.pages}
              onChange={(e) => handleChange("pages", Number(e.target.value))}
              placeholder="Páginas"
            />
            <span>Descrição:</span>
            <Textarea
              value={form.synopsis}
              onChange={(e) => handleChange("synopsis", e.target.value)}
              placeholder="Sinopse"
            />
            <Input
              value={form.cover}
              onChange={(e) => handleChange("cover", e.target.value)}
              placeholder="URL da capa"
            />
            <span>Status</span>
            <Select
              value={form.status}
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LIDO">Lido</SelectItem>
                <SelectItem value="LENDO">Lendo</SelectItem>
                <SelectItem value="QUERO_LER">Quero ler</SelectItem>
                <SelectItem value="PAUSADO">Pausado</SelectItem>
                <SelectItem value="ABANDONADO">Abandonado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex gap-2 mt-4">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSave}
              disabled={loading}
            >
              <SaveIcon /> {loading ? "Salvando..." : "Salvar"}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
