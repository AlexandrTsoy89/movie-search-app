import type { Movie, MoviesResult, TmdbSearchResponse } from "@/types/movie";

const MOVIES_PER_PAGE = 6;
const TMDB_PAGE_SIZE = 20;

export async function getMovies(
  query: string,
  page: number,
): Promise<MoviesResult> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB access token is missing");
  }

  const startIndex = (page - 1) * MOVIES_PER_PAGE;

  const firstApiPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;

  const lastApiPage =
    Math.floor((startIndex + MOVIES_PER_PAGE - 1) / TMDB_PAGE_SIZE) + 1;

  async function fetchTmdbPage(apiPage: number): Promise<TmdbSearchResponse> {
    const params = new URLSearchParams({
      query,
      page: String(apiPage),
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

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
    }

    return response.json();
  }

  const firstData = await fetchTmdbPage(firstApiPage);

  let results = firstData.results;

  if (firstApiPage !== lastApiPage) {
    const secondData = await fetchTmdbPage(lastApiPage);

    results = [...results, ...secondData.results];
  }

  const offset = startIndex % TMDB_PAGE_SIZE;

  const visibleResults = results.slice(offset, offset + MOVIES_PER_PAGE);

  const movies: Movie[] = visibleResults.map((movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    description: movie.overview,
    posterPath: movie.poster_path,
    genreIds: movie.genre_ids,
  }));

  console.log(movies);

  return {
    movies,
    totalPages: Math.ceil(firstData.total_results / MOVIES_PER_PAGE),
    totalResults: firstData.total_results,
  };
}
