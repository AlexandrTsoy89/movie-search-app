"use client";

import { Tag } from "antd";
import { useGenres } from "@/context/GenreContext";

type MovieGenresProps = {
  genreIds: number[];
};

export default function MovieGenres({ genreIds }: MovieGenresProps) {
  const genres = useGenres();

  const movieGenres = genres.filter((genre) => genreIds.includes(genre.id));

  return (
    <div className="flex flex-wrap gap-2">
      {movieGenres.map((genre) => (
        <Tag key={genre.id} className="!m-0">
          {genre.name}
        </Tag>
      ))}
    </div>
  );
}
