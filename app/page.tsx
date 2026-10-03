import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/lib/getMovies";
import MoviePagination from "@/components/MoviePagination";

type HomeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const movies = await getMovies();

  const moviesPerPage = 6;

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  const visibleMovies = movies.slice(startIndex, endIndex);

  return (
    <main className="mx-auto max-w-[936px] py-5">
      <h1 className="mb-5 text-xl">Movies</h1>

      <div className="grid grid-cols-2 gap-x-[34px] gap-y-[35px]">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <MoviePagination
          currentPage={currentPage}
          totalMovies={movies.length}
        />
      </div>
    </main>
  );
}
