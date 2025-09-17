"use client"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"
import { Book } from "../types/books"

interface ChartProps {
  data: Book[]
  color?: string
}

export default function Chart({ data, color = "#58B05C" }: Readonly<ChartProps>) {
  const chartConfig: ChartConfig = {
    books: {
      label: "Livros",
      color,
    },
  }

  const booksByYear: Record<number, number> = {}
  data.forEach((book) => {
    booksByYear[book.year_registration] =
      (booksByYear[book.year_registration] || 0) + 1
  })

  const chartData = Object.entries(booksByYear).map(([year, count]) => ({
    year,
    books: count,
  }))

  return (
    <ChartContainer config={chartConfig} className="w-[500px]">
      <BarChart data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="books" fill="var(--color-books)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
