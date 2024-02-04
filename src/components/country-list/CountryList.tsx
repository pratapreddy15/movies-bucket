"use client";

import Link from "next/link";

import FilterInput from "@/components/filter-input/FilterInput";
import { Country } from "@/types/model";
import styles from "./CountryList.module.css";
import { useEffect, useState } from "react";

type CountryListProps = {
  loadedCountries: Country[];
};

function sortCountries(countries: Country[]) {
  const sortedCountries = countries.sort((c1, c2) => {
    if (c1.english_name < c2.english_name) {
      return -1;
    }

    if (c1.english_name > c2.english_name) {
      return 1;
    }

    return 0;
  });

  return sortedCountries;
}

function CountryList({ loadedCountries }: CountryListProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const sortedCountries = sortCountries(loadedCountries);
    setCountries(sortedCountries);
  }, []);

  function filterChangeHandler(filterText: string) {
    const trimmedFilterText = filterText.trim();
    const sorted = [];

    if (trimmedFilterText.trim().length > 0) {
      const filteredCountries = loadedCountries.filter((country) => country.english_name.toLowerCase().startsWith(trimmedFilterText.toLowerCase()));
      const filteredAndSorted = sortCountries(filteredCountries);
      sorted.push(...filteredAndSorted);
    }
    setCountries(sorted);
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
