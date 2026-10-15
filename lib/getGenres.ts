import type { TmdbGenreResponse } from "@/types/movie";

export async function getGenres(): Promise<TmdbGenreResponse> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB access token is missing");
  }

  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 86400,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.status}`);
  }

  const data: TmdbGenreResponse = await response.json();

  return data;
}
