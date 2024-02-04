import { NextRequest } from "next/server";

import { fetchMoviesByPage } from "@/utils/themoviedb";

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const pageNumberString = searchParams.get("page");

  if (!pageNumberString) {
    return Response.json({ message: "Page number missing in the request" }, { status: 400, statusText: "Bad request" });
  }

  if (isNaN(Number(pageNumberString)) || Number(pageNumberString) < 0) {
    return Response.json({ message: "Invalid page number" }, { status: 400, statusText: "Bad request" });
  }

  const pageNumber = +pageNumberString;

  const movies = await fetchMoviesByPage(pageNumber, "/discover/movie", { include_adult: "false", include_video: "false" });

  return Response.json({ movies: movies.results }, { status: 200, statusText: "Success" });
}
