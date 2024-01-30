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
  const sortedCountries = loadedCountries.sort((c1, c2) => {
    if (c1.english_name < c2.english_name) {
      return -1;
    }

    if (c1.english_name < c2.english_name) {
      return 1;
    }

    return 0;
  });
  const [countries, setCountries] = useState(sortedCountries);

  function filterChangeHandler(filterText: string) {
    const trimmedFilterText = filterText.trim();
    if (trimmedFilterText.trim().length > 0) {
      const filteredCountries = sortedCountries.filter((country) => country.english_name.toLowerCase().startsWith(trimmedFilterText.toLowerCase()));
      setCountries(filteredCountries);
    } else {
      setCountries(sortedCountries);
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
