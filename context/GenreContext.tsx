"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { TmdbGenre } from "@/types/movie";

type GenreContextType = {
  genres: TmdbGenre[];
};

const GenreContext = createContext<GenreContextType | null>(null);

type GenreProviderProps = {
  children: ReactNode;
  genres: TmdbGenre[];
};

export function GenreProvider({ children, genres }: GenreProviderProps) {
  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenreContext);

  if (!context) {
    throw new Error("useGenres must be used within GenreProvider");
  }

  return context.genres;
}
