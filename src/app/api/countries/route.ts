import { getCountries } from "@/utils/themoviedb";
import {generateRandomId} from "@/utils/random"

export async function GET() {
  const countriesResposne = await getCountries();
  const countries = countriesResposne.map((country) => ({ id: generateRandomId(), code: country.iso_3166_1, name: country.english_name }));
  return Response.json(countries);
}
