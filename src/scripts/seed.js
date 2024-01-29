const { createClient } = require("@supabase/supabase-js");

const supabaseBaseUrl = process.env.SUPABASE_BASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const theMovieDbApiKey = process.env.THEMOVIEDB_API_KEY;
const THEMOVIEDB_BASE_URL = "https://api.themoviedb.org/3";

if (!supabaseBaseUrl || !supabaseKey) {
  throw new Error("Supabase config not found in environment variables");
}

const supabase = createClient(supabaseBaseUrl, supabaseKey);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getData(path) {
  const response = await fetch(`${THEMOVIEDB_BASE_URL}${path}?api_key=${theMovieDbApiKey}`);
  const data = await response.json();
  return data;
}

async function loadRegionsData(regions, timezones) {
  const rows = regions.map((region) => {
    const country = {
      name: region.english_name,
      code: region.iso_3166_1,
      timezones: [],
    };

    const timezoneData = timezones.filter((timezone) => timezone.iso_3166_1 === region.iso_3166_1);
    timezoneData.forEach((timezone) => {
      country.timezones.push(...timezone.zones);
    });
    return country;
  });

  const { error } = await supabase.from("countries").insert([...rows]);

  if (error) {
    console.log("Failed to load data to countries table", error);
  }

  console.log("Loaded regions with timezones data to db");
}

async function loadLanguagesData(languages) {
  const rows = languages.map((region) => {
    return {
      name: region.english_name,
      code: region.iso_639_1,
    };
  });

  const { error } = await supabase.from("languages").insert([...rows]);

  if (error) {
    console.log("Failed to load data to languages table", error);
  }

  console.log("Loaded languages data to db");
}

async function seedDatabase() {
  const regions = await getData("/watch/providers/regions");
  const timezones = await getData("/configuration/timezones");
  const languages = await getData("/configuration/languages");

  await loadRegionsData(regions.results, timezones);
  await loadLanguagesData(languages);
}

seedDatabase();
