export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Country = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
};

export type CountryResponse = {
  results: Country[];
};

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type LanguageResponse = Language[];

export type Genre = {
  id: string;
  name: string;
};

export type GenreResponse = {
  genres: Genre[];
};
