import styles from "./page.module.css";

export default function BrowseByPageNumber() {
  return (
    <div className={styles.moviesPage}>
      <p className={styles.title}>Choose a filter to list the movies of your choice</p>
    </div>
  );
}
