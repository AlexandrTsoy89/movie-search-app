import { cookies } from "next/headers";
import { Empty } from "antd";
import MovieCard from "@/components/MovieCard";
import MoviePagination from "@/components/MoviePagination";
import { getRatedMovies } from "@/lib/getRatedMovies";

type RatedPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function RatedPage({ searchParams }: RatedPageProps) {
  const params = await searchParams;

  const parsedPage = Number(params.page ?? "1");

  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const cookieStore = await cookies();

  const guestSessionId = cookieStore.get("tmdb_guest_session")?.value;

  if (!guestSessionId) {
    return (
      <main className="mx-auto w-full max-w-[936px]">
        <Empty description="Guest session not initialized yet" />
      </main>
    );
  }

  const { movies, totalResults } = await getRatedMovies(guestSessionId, page);

  return (
    <main className="mx-auto w-full max-w-[936px]">
      {movies.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Empty description="You haven't rated any movies yet" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-[34px] gap-y-[35px] lg:grid-cols-2">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <MoviePagination currentPage={page} totalMovies={totalResults} />
          </div>
        </>
      )}
    </main>
  );
}
