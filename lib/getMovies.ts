import type { Movie, TmdbSearchResponse } from "@/types/movie";

export async function getMovies(): Promise<Movie[]> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=return",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
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

  return movies;
}
