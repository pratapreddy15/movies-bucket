"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { KeyValuePair } from "@/types";

type PaginationProps = {
  totalPages: number;
  queryString: KeyValuePair<string>;
};

export default function Pagination({ totalPages, queryString }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(queryString);

  const matches = /^\/browse\/[0-9]+$/.exec(pathname);
  const page = matches?.at(1);
  if (!!page) {
    throw new Error("Invalid query string found in the url");
  }

  // const page = searchParams.get("page");
  // searchParams.delete("page");
  const pageNumber = Number(page);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <Link href={`/browse?${searchParams.toString()}&page=${pageNumber > 1 ? pageNumber - 1 : pageNumber}`}>Prev</Link>
      </div>
      <div>
        <span>{page}</span>
        <span> of </span>
        <span>{totalPages}</span>
      </div>
      <div>
        <Link href={`/browse?${searchParams.toString()}&page=${pageNumber < 500 ? pageNumber + 1 : pageNumber}`}>Next</Link>5fdA
      </div>
    </div>
  );
}
