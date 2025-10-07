"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // aplica tema no HTML root
  const applyTheme = (theme: "light" | "dark" | "system") => {
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
    localStorage.setItem("bookshelf-theme", theme);
    setTheme(theme);
  };

  // carrega tema salvo
  useEffect(() => {
    const stored =
      (localStorage.getItem("bookshelf-theme") as typeof theme) || "system";
    applyTheme(stored);

    if (stored === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  return (
    <Select
      value={theme}
      onValueChange={applyTheme}
      aria-label="Selecionar tema"
    >
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Tema" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">
            <div className="flex items-center gap-2">
              <SunIcon className="text-yellow-500" />
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center gap-2">
              <MoonIcon className="text-blue-500" />
            </div>
          </SelectItem>
          <SelectItem value="system">
            <div className="flex items-center gap-2">
              <Monitor className="text-gray-500" />
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
