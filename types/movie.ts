export type Movie = {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  description: string;
  posterPath: string | null;
  genreIds: number[];
  userRating?: number;
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

export type TmdbRatedMovie = TmdbMovie & {
  rating: number;
};

export type TmdbRatedMoviesResponse = {
  page: number;
  results: TmdbRatedMovie[];
  total_pages: number;
  total_results: number;
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbGenreResponse = {
  genres: TmdbGenre[];
};
