import { getGenres } from "@/utils/themoviedb";
import GenreFilter from "@/components/genre-filter/GenreFilter";
// import PaginationProvider from "@/context/pagination-context";
import styles from "./layout.module.css";

export default async function BrowseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const genres = await getGenres();
  //   const countries = await getCountries();

  return (
    <div className={styles.browse}>
      <div className={styles.filterPanel}>
        <GenreFilter loadedGenres={genres} />
        {/* <div className={styles.countriesFilter}></div>
        <div className={styles.directorsFilter}></div>
        <div className={styles.writersFilter}></div>
        <div className={styles.actorsFilter}></div> */}
      </div>
      <div className={styles.filterResult}>
        {children}
        {/* <PaginationProvider>
          {movies}
          {pagination}
        </PaginationProvider> */}
      </div>
    </div>
  );
}
