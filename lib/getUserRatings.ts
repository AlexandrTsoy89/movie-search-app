import type { TmdbRatedMoviesResponse } from "@/types/movie";

export async function getUserRatings(
  guestSessionId: string,
): Promise<Map<number, number>> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB access token is missing");
  }

  const ratings = new Map<number, number>();

  let page = 1;
  let totalPages = 1;

  do {
    const params = new URLSearchParams({
      page: String(page),
      language: "en-US",
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${encodeURIComponent(guestSessionId)}/rated/movies?${params.toString()}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user ratings: ${response.status}`);
    }

    const data: TmdbRatedMoviesResponse = await response.json();

    for (const movie of data.results) {
      ratings.set(movie.id, movie.rating);
    }

    totalPages = Math.min(data.total_pages, 500);
    page++;
  } while (page <= totalPages);

  return ratings;
}
