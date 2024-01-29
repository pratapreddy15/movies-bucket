import { FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import { IoClose } from "react-icons/io5";

import styles from "./ChangeCountry.module.css";

interface ChangeCountryProps {
  onDialogClose: () => void;
  onSelectCountry: (code: string, name: string) => void;
}

function ChangeCountry({ onDialogClose, onSelectCountry }: ChangeCountryProps) {
  const [countries, setCountries] = useState<{ id: string; code: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch("/api/countries");
      const json = await response.json();
      setCountries(json);
      setIsLoading(false);
    })();
  }, []);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedCountryCode = formData.get("countries");
    const selectedCountry = countries.find((country) => country.code === selectedCountryCode);
    if (!selectedCountry) {
      throw new Error(`Error selecting country code`);
    }

    onSelectCountry(selectedCountry.code, selectedCountry.name);
  };

  return (
    <div className={styles.modal}>
      <button className={styles.closeBtn} onClick={onDialogClose}>
        <IoClose />
      </button>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <label className={styles.label} htmlFor="countries">
          Select country
        </label>
        <Select
          id="countries"
          name="countries"
          className={styles.countryOptions}
          isClearable={true}
          isSearchable={true}
          isLoading={isLoading}
          placeholder={isLoading ? "Loading countries..." : "Select country"}
          options={countries.map((country) => ({ value: country.code, label: `${country.name} (${country.code})` }))}
        />
        <button className={[styles.setCountryBtn, "btn", "btn-primary"].join(" ")}>Set Country</button>
      </form>
    </div>
  );
}

export default ChangeCountry;
