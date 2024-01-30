"use client";

import Link from "next/link";

import FilterInput from "@/components/filter-input/FilterInput";
import { Country } from "@/types/model";
import styles from "./CountryList.module.css";
import { useState } from "react";

type CountryListProps = {
  loadedCountries: Country[];
};

function CountryList({ loadedCountries }: CountryListProps) {
  const [countries, setCountries] = useState(loadedCountries);

  function filterChangeHandler(filterText: string) {
    const trimmedFilterText = filterText.trim();
    if (trimmedFilterText.trim().length > 0) {
      const filteredCountries = loadedCountries.filter((country) => country.english_name.toLowerCase().includes(trimmedFilterText.toLowerCase()));
      setCountries(filteredCountries);
    } else {
      setCountries(loadedCountries);
    }
  }

  return (
    <div className={styles.countries}>
      <div className={styles.title}>Browse by country</div>
      <FilterInput placeholder="Search for country..." onFilterChange={filterChangeHandler} />
      <div className={styles.countryCards}>
        <ul className={styles.countryList}>
          {countries.map((country) => (
            <li key={country.iso_3166_1} className={styles.countryItem}>
              <Link href={`/browse/country=${country.iso_3166_1}`}>{country.english_name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CountryList;
