"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { title } from "process";
import { CreateBook, GetGenres } from "../api/data";
const DEFAULT_COVER = "/covers/default-cover.png";
const schema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  year_published: z.number().min(0),
  pages: z.number().min(1),
  synopsis: z.string().optional(),
  status: z
    .enum(["LIDO", "LENDO", "QUERO_LER", "PAUSADO", "ABANDONADO"])
    .default("QUERO_LER"),
  cover: z.string().url().or(z.literal("")).optional(),
});

export default function AddBookPage() {
  const router = useRouter();
  const [genres, setGenres] = useState<{ id: string; genre: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: "QUERO_LER" },
  });

  const coverUrl = watch("cover");

  useEffect(() => {
    if (coverUrl && coverUrl.trim() !== "") {
      setCoverPreview(coverUrl);
    } else {
      setCoverPreview(DEFAULT_COVER);
    }
  }, [coverUrl]);

  useEffect(() => {
    GetGenres().then(setGenres);
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const yearNow = new Date().getFullYear();
      await CreateBook({ ...data, year_registration: yearNow });
      router.push("/library");
    } catch {
      alert("Erro ao criar livro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Livro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label className="block mb-1 font-semibold">Título</Label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label className="block mb-1 font-semibold">Autor</Label>
          <Input {...register("author")} />
          {errors.author && (
            <p className="text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label className="block mb-1 font-semibold">Gênero</Label>
          <Select onValueChange={(value) => setValue("genre", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((g) => (
                <SelectItem key={g.id} value={g.genre}>
                  {g.genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.genre && (
            <p className="text-red-500">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <Label className="block mb-1 font-semibold">Ano de Publicação</Label>
          <Input
            type="number"
            {...register("year_published", { valueAsNumber: true })}
          />
          {errors.year_published && (
            <p className="text-red-500">{errors.year_published.message}</p>
          )}
        </div>

        <div>
          <Label className="block mb-1 font-semibold">Número de Páginas</Label>
          <Input
            type="number"
            {...register("pages", { valueAsNumber: true })}
          />
          {errors.pages && (
            <p className="text-red-500">{errors.pages.message}</p>
          )}
        </div>

        <div>
          <Label className="block mb-1 font-semibold">Sinopse</Label>
          <Textarea {...register("synopsis")} />
        </div>

        <div>
          <Label className="block mb-1 font-semibold">Status</Label>
          <Select
            onValueChange={(value) =>
              setValue(
                "status",
                value as
                  | "QUERO_LER"
                  | "LIDO"
                  | "LENDO"
                  | "PAUSADO"
                  | "ABANDONADO"
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LENDO">Lendo</SelectItem>
              <SelectItem value="LIDO">Lido</SelectItem>
              <SelectItem value="QUERO_LER">Quero ler</SelectItem>
              <SelectItem value="PAUSADO">Pausado</SelectItem>
              <SelectItem value="ABANDONADO">Abandonado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block mb-1 font-semibold">URL da Capa</Label>
          <Input type="text" {...register("cover")} placeholder="https://..." />
        </div>

        {coverPreview && (
          <div className="mt-2">
            <p className="mb-1 font-semibold">Preview da Capa:</p>
            <img
              src={coverPreview}
              alt={`Capa do livro ${title}`}
              className="object-cover w-[250px] h-[350px]"
            />
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Adicionar Livro"}
        </Button>
      </form>
    </div>
  );
}
