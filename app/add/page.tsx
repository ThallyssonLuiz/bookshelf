"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { SaveIcon } from "lucide-react";
import { CreateBook, GetGenres } from "../api/data";
import { toast } from "sonner";

const DEFAULT_COVER = "/covers/default-cover.png";

const schema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  author: z.string().min(1, { message: "O autor é obrigatório" }),
  genreId: z.string({ message: "Adicione um gênero" }).min(1),
  year_published: z
    .number({ message: "Adicione um ano válido" })
    .min(1000, { message: "Adicione um ano válido" })
    .max(new Date().getFullYear(), { message: "Adicione um ano válido" }),
  pages: z
    .number({ message: "Adicione um número de páginas" })
    .min(1, { message: "O número de páginas deve ser maior que 0" }),
  synopsis: z.string().optional(),
  status: z.enum(["LIDO", "LENDO", "QUERO_LER", "PAUSADO", "ABANDONADO"]),
  cover: z.string().url().or(z.literal("")).optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddBookPage() {
  const router = useRouter();
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(DEFAULT_COVER);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "QUERO_LER" },
  });

  const coverUrl = watch("cover");

  useEffect(() => {
    setCoverPreview(coverUrl?.trim() ? coverUrl : DEFAULT_COVER);
  }, [coverUrl]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await GetGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
        toast.error("Erro ao carregar gêneros");
      }
    };
    loadGenres();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const yearNow = new Date().getFullYear();
      await CreateBook({ 
        ...data,
        year_registration: yearNow,
        cover: data.cover || DEFAULT_COVER
      });

      toast.success("Livro adicionado com sucesso!");
      
      startTransition(() => {
        router.push("/library");
      });
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      toast.error("Erro ao criar livro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Livro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          label="Título"
          {...register("title")}
          error={errors.title?.message}
        />
        <InputField
          label="Autor"
          {...register("author")}
          error={errors.author?.message}
        />
        <SelectField
          label="Gênero"
          options={genres}
          onChange={(value: string) => setValue("genreId", value)}
          error={errors.genreId?.message}
        />
        <InputField
          label="Ano de Publicação"
          type="number"
          {...register("year_published", { valueAsNumber: true })}
          error={errors.year_published?.message}
        />
        <InputField
          label="Número de Páginas"
          type="number"
          {...register("pages", { valueAsNumber: true })}
          error={errors.pages?.message}
        />
        <TextareaField label="Sinopse" {...register("synopsis")} />
        <SelectField
          label="Status"
          options={[
            { id: "LENDO", name: "Lendo" },
            { id: "LIDO", name: "Lido" },
            { id: "QUERO_LER", name: "Quero Ler" },
            { id: "PAUSADO", name: "Pausado" },
            { id: "ABANDONADO", name: "Abandonado" }
          ]}
          onChange={(value: string) => setValue("status", value as any)}
        />
        <InputField
          label="URL da Capa"
          {...register("cover")}
          placeholder="https://..."
        />

        {coverPreview && (
          <div className="flex justify-center">
            <img
              src={coverPreview}
              alt="Preview da capa"
              className="rounded object-cover w-[250px] h-[350px]"
              onError={() => setCoverPreview(DEFAULT_COVER)}
            />
          </div>
        )}

        <Button
          className="bg-green-600 hover:bg-green-700"
          type="submit"
          disabled={loading}
        >
          <SaveIcon className="mr-2 h-4 w-4" />
          {loading ? "Salvando..." : "Adicionar Livro"}
        </Button>
      </form>
    </div>
  );
}

// Componentes auxiliares
function InputField({ label, error, ...props }: any) {
  return (
    <div>
      <Label className="block mb-1 font-semibold">{label}</Label>
      <Input {...props} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function TextareaField({ label, ...props }: any) {
  return (
    <div>
      <Label className="block mb-1 font-semibold">{label}</Label>
      <Textarea {...props} />
    </div>
  );
}

function SelectField({ label, options, onChange, error }: any) {
  return (
    <div>
      <Label className="block mb-1 font-semibold">{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
