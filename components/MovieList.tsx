import MovieCard from "@/components/MovieCard";
import MoviePagination from "@/components/MoviePagination";
import { getMovies } from "@/lib/getMovies";
import { getUserRatings } from "@/lib/getUserRatings";
import { cookies } from "next/headers";
import { Empty } from "antd";

type MovieListProps = {
  query: string;
  page: number;
};

export default async function MovieList({ query, page }: MovieListProps) {
  // Получаем гостевую сессию из cookies
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get("tmdb_guest_session")?.value;

  // Получаем фильмы по поисковому запросу
  const { movies, totalResults } = await getMovies(query, page);

  // Получаем сохранённые оценки пользователя из TMDB
  const userRatings = guestSessionId
    ? await getUserRatings(guestSessionId)
    : new Map<number, number>();

  // Добавляем пользовательскую оценку к каждому фильму
  const moviesWithRatings = movies.map((movie) => ({
    ...movie,
    userRating: userRatings.get(movie.id) ?? 0,
  }));
  console.log(
    "Movie IDs:",
    moviesWithRatings.map((movie) => movie.id),
  );

  return (
    <>
      {moviesWithRatings.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Empty description="No movies found" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-[34px] gap-y-[35px] lg:grid-cols-2">
          {moviesWithRatings.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {totalResults > 0 && (
        <div className="mt-8 flex justify-center">
          <MoviePagination currentPage={page} totalMovies={totalResults} />
        </div>
      )}
    </>
  );
}
