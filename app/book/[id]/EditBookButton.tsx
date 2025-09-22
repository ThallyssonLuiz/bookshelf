"use client";

import { useState } from "react";
import { UpdateBook } from "@/app/api/data";
import { Book } from "@/app/types/books";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface EditBookButtonProps {
  initialBook: Book;
  onUpdate: (updatedBook: Book) => void;
}

export default function EditBookButton({ initialBook, onUpdate }: EditBookButtonProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: initialBook.title,
    author: initialBook.author,
    genre: initialBook.genre,
    year: initialBook.year_published,
    pages: initialBook.pages,
    status: initialBook.status,
    synopsis: initialBook.synopsis || "",
    cover: initialBook.cover || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleCancel = () => {
    setForm({
      title: initialBook.title,
      author: initialBook.author,
      genre: initialBook.genre,
      year: initialBook.year_published,
      pages: initialBook.pages,
      status: initialBook.status,
      synopsis: initialBook.synopsis || "",
      cover: initialBook.cover || "",
    });
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated: Partial<Book> = {
        title: form.title,
        author: form.author,
        genre: form.genre,
        year_published: form.year,
        pages: form.pages,
        status: form.status,
        synopsis: form.synopsis,
        cover: form.cover,
      };
      const result = await UpdateBook(initialBook.id, updated);
      onUpdate(result);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar livro");
    } finally {
      setLoading(false);
    }
  };

  if (!editing) return <Button onClick={() => setEditing(true)}>Editar Livro</Button>;

  return (
    <div className="flex flex-col gap-2 border p-4 rounded bg-gray-50">
      <span>Título:</span>
      <Input value={form.title} onChange={e => handleChange("title", e.target.value)} placeholder="Título" />
      <span>Autor:</span>
      <Input value={form.author} onChange={e => handleChange("author", e.target.value)} placeholder="Autor" />
      <span>Gênero</span>
      <Input value={form.genre} onChange={e => handleChange("genre", e.target.value)} placeholder="Gênero" />
      <span>Ano de publicação:</span>
      <Input type="number" value={form.year} onChange={e => handleChange("year", Number(e.target.value))} placeholder="Ano" />
      <span>Número de páginas:</span>
      <Input type="number" value={form.pages} onChange={e => handleChange("pages", Number(e.target.value))} placeholder="Páginas" />
      <span>Descrição:</span>
      <Textarea value={form.synopsis} onChange={e => handleChange("synopsis", e.target.value)} placeholder="Sinopse" />
      <Input value={form.cover} onChange={e => handleChange("cover", e.target.value)} placeholder="URL da capa" />
      <span>Status</span>
      <Select value={form.status} onValueChange={v => handleChange("status", v)}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="LIDO">Lido</SelectItem>
          <SelectItem value="LENDO">Lendo</SelectItem>
          <SelectItem value="QUERO_LER">Quero ler</SelectItem>
          <SelectItem value="PAUSADO">Pausado</SelectItem>
          <SelectItem value="ABANDONADO">Abandonado</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2 mt-2">
        <Button onClick={handleSave} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
        <Button variant="outline" onClick={handleCancel} disabled={loading}>Cancelar</Button>
      </div>
    </div>
  );
}