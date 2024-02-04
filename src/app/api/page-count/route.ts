import { fetchMoviesByPage } from "@/utils/themoviedb";

export async function GET() {
  const result = await fetchMoviesByPage(1, "/discover/movie", { include_adult: "false", include_video: "false" });
  const totalPages = result.total_pages;
  return Response.json({ pageCount: totalPages });
}
