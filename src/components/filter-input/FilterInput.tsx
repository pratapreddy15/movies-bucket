"use client";

import { useRef } from "react";
import styles from "./FilterInput.module.css";

type FilterInputProps = {
  placeholder: string;
  onFilterChange: (value: string) => void;
};

function FilterInput({ placeholder, onFilterChange }: FilterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.filter}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        ref={inputRef}
        onChange={() => {
          onFilterChange(inputRef.current ? inputRef.current.value : "");
        }}
      />
    </div>
  );
}

export default FilterInput;
