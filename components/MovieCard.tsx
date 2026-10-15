import type { Movie } from "@/types/movie";
import { Card } from "antd";
import Image from "next/image";
import { format, isValid, parseISO } from "date-fns";
import MovieRating from "@/components/MovieRating";
import MovieScore from "@/components/MovieScore";
import MovieGenres from "@/components/MovieGenres";

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

  return (
    <Card
      className="min-h-[279px] w-full max-w-[451px] overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] lg:h-[279px]"
      styles={{ body: { padding: 0, height: "100%" } }}
    >
      <div className="flex h-full">
        <div className="relative w-[35%] shrink-0 sm:w-[184px]">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 639px) 35vw, 184px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              No image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="m-0 min-w-0 flex-1 text-[20px] font-normal leading-[28px] text-black">
              {movie.title}
            </h2>

            <MovieScore rating={movie.rating} />
          </div>
          <p className="m-0 text-[12px] font-normal leading-[22px] text-[#827E7E]">
            {formattedDate}
          </p>
          <MovieGenres genreIds={movie.genreIds} />

          <p className="m-0 line-clamp-4 text-xs font-normal leading-[22px] text-black">
            {movie.description}
          </p>
          <div className="mt-auto w-full">
            <MovieRating
              movieId={movie.id}
              initialRating={movie.userRating ?? 0}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
