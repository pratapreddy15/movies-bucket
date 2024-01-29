import { envConfig } from "@/constants/config";
import { getTmdbApiKey } from "@/utils/getTmdbApiKey";
import { KeyValuePair } from "@/types";
import { CountryResponse, GenreResponse, LanguageResponse, Movie, MovieResponse } from "@/types/model";

export async function getCountries() {
  const key = getTmdbApiKey();
  const response = await fetch(`https://api.themoviedb.org/3/watch/providers/regions?api_key=${key}`, {
    next: {
      revalidate: envConfig.revalidationInterval, // latest now playing movies every 6 hours
    },
  });

  const countryResponse = (await response.json()) as CountryResponse;
  return countryResponse.results;
}

export async function getLanguages() {
  const key = getTmdbApiKey();
  const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${key}`, {
    next: {
      revalidate: envConfig.revalidationInterval, // latest now playing movies every 6 hours
    },
  });

  const languageResponse = (await response.json()) as LanguageResponse;
  return languageResponse;
}

export async function getGenres() {
  const key = getTmdbApiKey();
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${key}`, {
    next: {
      revalidate: envConfig.revalidationInterval, // latest now playing movies every 6 hours
    },
  });

  const genreResponse = (await response.json()) as GenreResponse;
  return genreResponse.genres;
}

export function removeDuplicates(movies: Movie[]) {
  const uniqueTitledMovies = movies.reduce<Movie[]>((acc, curr) => {
    if (acc.findIndex((addedMovie) => addedMovie.original_title === curr.original_title) === -1) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return uniqueTitledMovies;
}

export function filterMoviesByLanguage(movies: Movie[], language: string): Movie[] {
  const filteredByLanguage = movies.filter((movie) => movie.original_language === language);
  return filteredByLanguage;
}

export async function fetchMoviesByPage(pageNumber: number, pathName: string, queryString: KeyValuePair<string>) {
  const key = getTmdbApiKey();

  const searchParams = new URLSearchParams(queryString);
  searchParams.append("api_key", key);
  searchParams.append("page", `${pageNumber}`);
  const params = searchParams.toString();

  const url = `${envConfig.theMovieDb.baseUrl}${pathName}?${params}`;

  const response = await fetch(url, {
    next: {
      revalidate: envConfig.revalidationInterval, // latest now playing movies every 6 hours
    },
  });
  const moviesResponse = (await response.json()) as MovieResponse;
  return moviesResponse;
}

export async function getMoviesPlayingNow(countryCode: string = "us", language: string = "en"): Promise<Movie[]> {
  const key = getTmdbApiKey();

  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&region=${countryCode}`, {
    next: {
      revalidate: envConfig.revalidationInterval, // latest now playing movies every 6 hours
    },
  });

  let moviesResponse = (await response.json()) as MovieResponse;
  const filtered = filterMoviesByLanguage(moviesResponse.results, language);

  const moviesPlayingNow = [...filtered];

  const totalPages = moviesResponse.total_pages;
  for (let i = 2; i < totalPages; i++) {
    moviesResponse = await fetchMoviesByPage(i, "/movie/now_playing", { region: countryCode });
    const filteredMoviesForPage = filterMoviesByLanguage(moviesResponse.results, language);

    moviesPlayingNow.push(...filteredMoviesForPage);
  }

  const uniqueTitledMovies = removeDuplicates(moviesPlayingNow);
  return uniqueTitledMovies;
}
