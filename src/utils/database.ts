import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "@/types/db";

export class SupabaseDb {
  private supabaseBaseUrl = process.env.SUPABASE_BASE_URL;
  private supabaseKey = process.env.SUPABASE_KEY;
  private dbClient: SupabaseClient<Database>;

  constructor() {
    if (!this.supabaseBaseUrl || !this.supabaseKey) {
      throw new Error("Supabase config not found in environment variables");
    }

    this.dbClient = createClient<Database>(this.supabaseBaseUrl, this.supabaseKey);
  }

  async getCountries() {
    const { data, error } = await this.dbClient.from("countries").select();
    if (error) {
      throw new Error(`Error getting countries - ${error.message}`);
    }

    return data;
  }

  async getCountriesByTimezone(timezone: string) {
    const { data: countries, error } = await this.dbClient.from("countries").select();
    if (error) {
      throw new Error(`Error getting countries for timezone ${timezone} - ${error.message}`);
    }

    const countriesByTimezone = countries.filter(
      (country) => (<string[]>country.timezones).findIndex((tz) => tz.toLowerCase() === timezone.toLowerCase()) > -1
    );

    return countriesByTimezone;
  }
}
