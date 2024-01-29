import { CountryCache } from "@/types";

export function cacheCountry(country: CountryCache) {
  sessionStorage.setItem("active_country", JSON.stringify(country));
}

export function getCachedCountry() {
  const country = sessionStorage.getItem("active_country");
  if (country) {
    const parsed: CountryCache = JSON.parse(country);
    return parsed;
  }
  return null;
}
