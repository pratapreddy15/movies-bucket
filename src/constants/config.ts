export const envConfig = {
  revalidationInterval: 6 * 60 * 60,
  supabase: {
    baseUrl: process.env.SUPABASE_BASE_URL || "",
    accessToken: process.env.SUPABASE_ACCESS_TOKEN || "",
    apiKey: process.env.SUPABASE_KEY || "",
  },
  theMovieDb: {
    baseUrl: "https://api.themoviedb.org/3",
    apiKey: process.env.THEMOVIEDB_API_KEY,
  },
};

export const appConfig = {
  defaultActiveCountry: { code: "AU", name: "Australia" },
};
