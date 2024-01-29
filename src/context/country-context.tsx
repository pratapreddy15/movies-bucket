import { ReactNode, SetStateAction, createContext, useState } from "react";
import { CountryContextType } from "@/types/index";

const initialState: CountryContextType = {
  country: {
    code: "",
    name: "",
  },
  dispatch: (value: SetStateAction<{ code: ""; name: "" }>) => {},
};

export const CountryContext = createContext(initialState);

type CountryProviderProps = {
  children: ReactNode;
};

export default function CountryProvider({ children }: CountryProviderProps) {
  const [country, setCountry] = useState<{ code: ""; name: "" }>({ code: "", name: "" });

  return (
    <CountryContext.Provider
      value={{
        country,
        dispatch: setCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}
