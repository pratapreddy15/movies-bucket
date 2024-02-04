import { Dispatch, SetStateAction } from "react";

export type KeyValuePair<T> = Record<string, T>;

export type CountryContextType = {
  country: {
    code: string;
    name: string;
  };
  dispatch: Dispatch<
    SetStateAction<{
      code: "";
      name: "";
    }>
  >;
};

export type CountryCache = {
  code: string;
  name: string;
};

export type PaginationState = {
  currentPageNumber: number;
  totalPages: number;
};

export type PaginationContextType = {
  currentPageNumber: number;
  totalPages: number;
  setCurrentPageNumber: (pageNumber: number) => void;
  setTotalPagesCount: (count: number) => void;
};
