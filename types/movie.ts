export type Movie = {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  description: string;
  posterPath: string | null;
};

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
};

export type TmdbSearchResponse = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

export type MoviesResult = {
  movies: Movie[];
  totalPages: number;
  totalResults: number;
};
