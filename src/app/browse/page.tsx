import { redirect } from "next/navigation";

import { KeyValuePair } from "@/types";
import { browseMovies, getGenres } from "@/utils/themoviedb";

import Pagination from "@/components/pagination/Pagination";

type BrowsePageProps = {
  searchParams: KeyValuePair<string>;
};

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const filters: KeyValuePair<string> = { include_adult: "false", include_video: "false" };

  const urlSearchParams = new URLSearchParams(searchParams);
  if (urlSearchParams.size === 0) {
    redirect("/browse?page=1");
  }

  const genres = urlSearchParams.get("genres");
  const page = urlSearchParams.get("page");
  if (!page) {
    if (genres) {
      redirect(`/browse?genres=${genres}&page=1`);
    }
    redirect(`/browse?page=1`);
  }

  if (genres) {
    filters.with_genres = genres.split(",").join("|");
  }

  const pageNumber = Number(page);
  const movies = await browseMovies(filters, pageNumber);
  const genresData = await getGenres();

  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        {movies.results.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.genre_ids.map((id) => genresData.find((genre) => +genre.id === id)?.name).join(",")})
          </li>
        ))}
      </ul>
      <Pagination totalPages={movies.total_pages} queryString={searchParams} />
    </div>
  );
}
