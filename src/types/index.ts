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
