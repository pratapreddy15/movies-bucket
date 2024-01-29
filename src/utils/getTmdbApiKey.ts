import { envConfig } from "@/constants/config";

export function getTmdbApiKey() {
  const key = envConfig.theMovieDb.apiKey;
  if (!key) {
    throw new Error("Api key for themoviedb not found in environment variables");
  }
  return key;
}
