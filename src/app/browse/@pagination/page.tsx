"use client";

import { useContext, useEffect } from "react";
import { IoArrowBackOutline, IoArrowForwardSharp } from "react-icons/io5";

import Spinner from "@/components/spinner/Spinner";
import { PaginationContext } from "@/context/pagination-context";
import styles from "./page.module.css";

export default function Page() {
  const { currentPageNumber, totalPages, setCurrentPageNumber, setTotalPagesCount } = useContext(PaginationContext);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/page-count");
      const data = await response.json();

      setTotalPagesCount(+data.pageCount);
      setCurrentPageNumber(1);
    })();
  }, [setCurrentPageNumber, setTotalPagesCount]);

  if (totalPages < 0) {
    return (
      <div className={styles.pagination}>
        <Spinner size="medium" />
      </div>
    );
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.prevPage}>
        <button
          className={styles.prevPageBtn}
          onClick={() => {
            if (currentPageNumber > 1) {
              setCurrentPageNumber(currentPageNumber - 1);
            }
          }}
        >
          <IoArrowBackOutline />
        </button>
      </div>

      <div className={styles.status}>
        <span>{currentPageNumber}</span>
        <span> of </span>
        <span>{totalPages}</span>
      </div>

      <div className={styles.nextPage}>
        <button
          className={styles.nextPageBtn}
          onClick={() => {
            if (currentPageNumber < totalPages) {
              setCurrentPageNumber(currentPageNumber + 1);
            }
          }}
        >
          <IoArrowForwardSharp />
        </button>
      </div>
    </div>
  );
}
