import type { Movie } from "@/types/movie";
import { Card, Tag } from "antd";
import Image from "next/image";
import { format, isValid, parseISO } from "date-fns";
import { truncateText } from "@/utils/truncateText";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  const releaseDate = parseISO(movie.releaseDate);

  const formattedDate = isValid(releaseDate)
    ? format(releaseDate, "MMMM d, yyyy")
    : "Release date unknown";

  console.log(formattedDate);

  return (
    <Card
      className="h-[279px] w-[451px] overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]"
      styles={{ body: { padding: 0, height: "100%" } }}
    >
      <div className="flex h-full">
        <div className="shrink-0">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              width={184}
              height={279}
              className="h-[279px] w-[184px] object-cover"
            />
          ) : (
            <div>No image</div>
          )}
        </div>

        <div className="min-w-0 p-4">
          <h2 className="m-0 text-[20px] font-normal leading-[28px] text-black">
            {movie.title}
          </h2>
          <p className="m-0 text-[12px] font-normal leading-[22px] text-[#827E7E]">
            {formattedDate}
          </p>
          <div className="flex gap-2">
            <Tag className="!m-0">Action</Tag>
            <Tag className="!m-0">Adventure</Tag>
          </div>
          <p>Rating: {movie.rating}</p>
          <p className="m-0 text-xs font-normal leading-[22px] text-black">
            {truncateText(movie.description, 180)}
          </p>
        </div>
      </div>
    </Card>
  );
}
