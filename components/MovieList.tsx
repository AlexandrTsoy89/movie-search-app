import MovieCard from "@/components/MovieCard";
import MoviePagination from "@/components/MoviePagination";
import { getMovies } from "@/lib/getMovies";
import { Empty } from "antd";

type MovieListProps = {
  query: string;
  page: number;
};

export default async function MovieList({ query, page }: MovieListProps) {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  const { movies, totalResults } = await getMovies(query, page);

  return (
    <>
      {movies.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Empty description="No movies found" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-[34px] gap-y-[35px]">
          {movies.map((movie) => (
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
