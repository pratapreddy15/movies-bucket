"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

import { Genre } from "@/types/model";
import styles from "./GenreFilter.module.css";

type GenreFilterProps = {
  loadedGenres: Genre[];
};

function sortGenres(genres: Genre[]) {
  const sortedGenres = genres.sort((g1, g2) => {
    if (g1.name < g2.name) {
      return -1;
    }

    if (g1.name > g2.name) {
      return 1;
    }

    return 0;
  });

  return sortedGenres;
}

function GenreFilter({ loadedGenres }: GenreFilterProps) {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedGenres.length > 0) {
      router.push(`/browse?genres=${selectedGenres.map((genre) => genre.id).join(",")}`);
    } else {
      router.push("/browse");
    }
  }, [selectedGenres]);

  const toggleGenreItemHandler = useCallback((isSelected: boolean, genre: Genre) => {
    if (isSelected) {
      setSelectedGenres((curr) => [...curr, genre]);
    } else {
      setSelectedGenres((curr) => curr.filter((g) => g.id !== genre.id));
    }
  }, []);

  const orderedGenres = useMemo(() => {
    const unselectedGenres = loadedGenres.filter((loadedGenre) => !selectedGenres.some((selectedGenre) => selectedGenre.id === loadedGenre.id));
    const sortedSelectedGenres = sortGenres(selectedGenres);
    const sortedUnselectedGenres = sortGenres(unselectedGenres);
    return [...sortedSelectedGenres, ...sortedUnselectedGenres];
  }, [selectedGenres.length]);

  return (
    <div className={styles.genresFilter}>
      <p className={styles.header}>Genres</p>
      <button className={styles.toggleGenreBtn} onClick={() => setIsExpanded((currState) => !currState)}>
        <span>{selectedGenres.length === 0 ? "None" : selectedGenres.length} selected </span>
        <span className={styles.icon}>{isExpanded ? <IoChevronUpSharp /> : <IoChevronDownSharp />}</span>
      </button>
      <ul className={[styles.genreList, isExpanded ? styles.expand : ""].join(" ").trim()}>
        {orderedGenres.map((genre) => (
          <li key={genre.id} className={styles.genreItem}>
            <input
              type="checkbox"
              name={`checkbox_genre_${genre.id}`}
              id={`checkbox_genre_${genre.id}`}
              onChange={(e) => {
                toggleGenreItemHandler(e.target.checked, genre);
              }}
            />
            <label htmlFor={`checkbox_genre_${genre.id}`}>{genre.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreFilter;
