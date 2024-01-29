import { Metadata } from "next";
import Image from "next/image";

import { getGenres, getCountries, getLanguages, fetchMoviesByPage } from "@/utils/themoviedb";
import { getCachedCountry } from "@/utils/sessionStorage";
import { appConfig } from "@/constants/config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Movies Bucket",
  description: "Browse movies by genre, year, country or language, create a wish list, recommend a movie to a friend and more",
  applicationName: "Movies bucket",
  category: "entertainment, movies",
  keywords: ["entertainment", "movies", "wishlist"],
};

const imagesConfig = [
  {
    path: "/images/image-1.jpg",
    alt: "Hero image from movie Spiderman: Homecoming",
  },
  {
    path: "/images/image-2.jpg",
    alt: "Hero image from movie Deadpool",
  },
  { path: "/images/image-3.jpg", alt: "Hero image from movie Ralph Breaks the Internet" },
  { path: "/images/image-4.jpg", alt: "Hero image from movie Avengers: Endgame" },
  { path: "/images/image-5.jpg", alt: "Hero image from movie Migration" },
  { path: "/images/image-6.jpg", alt: "Hero image from movie Drunken Master" },
  { path: "/images/image-7.jpg", alt: "Hero image from movie RRR" },
  { path: "/images/image-8.jpg", alt: "Hero image from movie Cast Away" },
  { path: "/images/image-9.jpg", alt: "Hero image from movie Passengers" },
  { path: "/images/image-10.jpg", alt: "Hero image from movie Mission: Impossible" },
  { path: "/images/image-11.jpg", alt: "Hero image from movie Timecrimes" },
  { path: "/images/image-12.jpg", alt: "Hero image from movie Hush" },
  { path: "/images/image-13.jpg", alt: "Hero image from movie John Wick" },
  { path: "/images/image-14.jpg", alt: "Hero image from movie Life" },
  { path: "/images/image-15.jpg", alt: "Hero image from movie Valerian and the City of a Thousand Planets" },
  { path: "/images/image-16.jpg", alt: "Hero image from movie Edge of Tomorrow" },
  { path: "/images/image-17.jpg", alt: "Hero image from movie Gravity" },
  { path: "/images/image-18.jpg", alt: "Hero image from movie Jason Bourne: Ultimatum" },
  { path: "/images/image-19.jpg", alt: "Hero image from movie Kingdom 3" },
  { path: "/images/image-20.jpg", alt: "Hero image from movie Detective Byomkesh Bakshy" },
  { path: "/images/image-21.jpg", alt: "Hero image from movie Children of Heaven" },
  { path: "/images/image-22.jpg", alt: "Hero image from movie The Pursuit of Happyness" },
  { path: "/images/image-23.jpg", alt: "Hero image from movie World War Z" },
  { path: "/images/image-24.jpg", alt: "Hero image from movie Rambo: First Blood" },
];

export default async function Home({ params }: any) {
  console.log("params", params);
  const genres = await getGenres();
  const languages = await getLanguages();
  const countries = await getCountries();
  // const activeCountry = getCachedCountry();
  // const activeCountryCode = activeCountry ? activeCountry.code : appConfig.defaultActiveCountry.code;
  // const moviesNowPlayingResponse = await fetchMoviesByPage(1, "/movie/now_playing", { region: activeCountryCode });
  // const moviesNowPlaying = moviesNowPlayingResponse.results;

  return (
    <section className={styles.homepage}>
      <main className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.overview}>
            <div className={styles.header}>A bucket of movies you wish to watch</div>
            <div className={styles.text}>Browse from {genres.length} types of genres</div>
            <div className={styles.text}>
              Movies from {countries.length} countries in {languages.length} different languages
            </div>
            <div className={styles.cta}>
              <button className={[styles.signInBtn, "btn", "btn-primary"].join(" ")}>Sign in</button>
              <button className={[styles.registerBtn, "btn", "btn-secondary"].join(" ")}>Register</button>
            </div>
          </div>
          <div className={styles.listWrapper} role="listbox">
            <div className={styles.list} role="list">
              {imagesConfig.map((img, i) => (
                <div key={i + 1} className={styles.listItem} role="listitem">
                  <Image src={img.path} height={100} width={140} alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.movieCategories}>
          <div className={styles.moviesByGenre}>
            <div className={styles.genreCards}>
              <ul className={styles.genreList}>
                {genres.map((genre) => (
                  <li key={genre.id} className={styles.genreItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.browseByGenre}></div>
          </div>
          <div className={styles.moviesByCountry}></div>
        </div>
      </main>
    </section>
  );
}
