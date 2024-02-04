"use client";

import { useContext, useEffect, useState } from "react";

import { PaginationContext } from "@/context/pagination-context";
import Spinner from "@/components/spinner/Spinner";
import { Movie } from "@/types/model";

import styles from "./page.module.css";

export default function MoviesPage() {
  const { currentPageNumber } = useContext(PaginationContext);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/browse?page=${currentPageNumber > 0 ? currentPageNumber : 1}`, { cache: "force-cache" });
      const json = await response.json();
      setMovies([...json.movies]);
    })();
  }, [currentPageNumber]);

  return (
    <div className={styles.movies}>
      {movies && movies.length > 0 ? (
        <ul className={styles.movieList}>
          {movies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              {movie.title}
            </li>
          ))}
        </ul>
      ) : (
        <Spinner size="large" />
      )}
    </div>
  );
}
