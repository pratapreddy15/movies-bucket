import { redirect } from "next/navigation";

import { KeyValuePair } from "@/types";
import { Movie } from "@/types/model";
import { browseMovies, getGenres } from "@/utils/themoviedb";

import Pagination from "@/components/pagination/Pagination";

type BrowsePageProps = {
  params: { pageNumber: number };
  searchParams: KeyValuePair<string>;
};

export default async function BrowseByPageNumberPage({ params, searchParams }: BrowsePageProps) {
  const filters: KeyValuePair<string> = { include_adult: "false", include_video: "false" };

  const urlSearchParams = new URLSearchParams(searchParams);
  const genres = urlSearchParams.get("genres");
  if (genres) {
    filters.with_genres = genres.split(",").join("|");
  }

  filters["releaseFrom"] = urlSearchParams.get("releaseFrom") || "";
  filters["releaseTo"] = urlSearchParams.get("releaseTo") || "";

  const moviesResponse = await browseMovies(filters, params.pageNumber);
  moviesResponse.body;
  const moviesBrowseResult: { movies: Movie[]; totalPages: number; totalResults: number } = await moviesResponse.json();
  const genresData = await getGenres();

  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        {moviesBrowseResult.movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.genre_ids.map((id) => genresData.find((genre) => +genre.id === id)?.name).join(",")})
          </li>
        ))}
      </ul>
      <Pagination totalPages={moviesBrowseResult.totalPages} queryString={searchParams} />
    </div>
  );
}
