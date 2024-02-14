"use client";

import { useRef } from "react";
import { redirect, useSearchParams, usePathname, useRouter } from "next/navigation";

import Button from "@/components/button/Button";
import styles from "./ReleaseDateFilter.module.css";

type ReleaseDateFilterProps = {
  onFilterByReleaseDates: (from: string, to: string) => void;
};

export default function ReleaseDateFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryString = new URLSearchParams(searchParams);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.releaseDateFilter}>
      <div className={styles.controls}>
        <label className={styles.releaseDateFrom}>
          <p className={styles.fieldHeader}>From</p>
          <input className={styles.input} type="date" ref={fromInputRef} defaultValue={queryString.get("releaseFrom") || ""} />
        </label>
        <label className={styles.releaseDateTo}>
          <p className={styles.fieldHeader}>To</p>
          <input className={styles.input} type="date" ref={toInputRef} defaultValue={queryString.get("releaseTo") || ""} />
        </label>
      </div>
      <Button
        mode="primary"
        extraStyles={{ margin: "0 15px" }}
        onClick={() => {
          const releaseFrom = fromInputRef.current ? fromInputRef.current.value : "";
          const releaseTo = toInputRef.current ? toInputRef.current.value : "";
          router.push(`/browse/1?releaseFrom=${releaseFrom}&releaseTo=${releaseTo}`);
        }}
      >
        Browse
      </Button>
    </div>
  );
}
