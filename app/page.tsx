import { Suspense } from "react";
import SearchInput from "@/components/SearchInput";
import MovieList from "@/components/MovieList";
import LoadingSpinner from "@/components/LoadingSpinner";

type HomeProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { query, page } = await searchParams;

  const searchQuery = query || "return";
  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <main className="mx-auto max-w-[936px] py-5">
      <h1 className="mb-5 text-xl">Movies</h1>

      <div className="mb-5">
        <SearchInput />
      </div>

      <Suspense
        key={`${searchQuery}-${currentPage}`}
        fallback={<LoadingSpinner />}
      >
        <MovieList query={searchQuery} page={currentPage} />
      </Suspense>
    </main>
  );
}
