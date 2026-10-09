import type { Movie, MoviesResult, TmdbSearchResponse } from "@/types/movie";

export async function getMovies(
  query: string,
  page: number,
): Promise<MoviesResult> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  const params = new URLSearchParams({
    query,
    page: String(page),
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?${params.toString()}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("TMDB REQUEST:", {
    query,
    page,
    status: response.status,
    ok: response.ok,
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("TMDB ERROR:", {
      status: response.status,
      message: errorText,
    });

    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data: TmdbSearchResponse = await response.json();

  const movies: Movie[] = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    description: movie.overview,
    posterPath: movie.poster_path,
  }));

  console.log(movies);

  return {
    movies,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}
