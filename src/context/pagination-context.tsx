"use client";

import { createContext, useReducer } from "react";
import { PaginationState, PaginationContextType } from "@/types/index";

enum PaginationActions {
  SET_CURRENT_PAGE_NUMBER = "setCurrentPageNumber",
  SET_TOTAL_PAGES = "setTotalPages",
}

type PaginationActionType = {
  type: PaginationActions;
  payload: { currentPageNumber: number; totalPages: number };
};

const initialState: PaginationState = {
  currentPageNumber: -1,
  totalPages: -1,
};

export const PaginationContext = createContext<PaginationContextType>({
  currentPageNumber: -1,
  totalPages: -1,
  setCurrentPageNumber(pageNumber) {},
  setTotalPagesCount(count) {},
});

function paginationReducer(state: PaginationState, action: PaginationActionType): PaginationState {
  switch (action.type) {
    case PaginationActions.SET_CURRENT_PAGE_NUMBER:
      return {
        ...state,
        currentPageNumber: action.payload.currentPageNumber,
      };
    case PaginationActions.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload.totalPages,
      };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

export default function PaginationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  return (
    <PaginationContext.Provider
      value={{
        currentPageNumber: state.currentPageNumber,
        totalPages: state.totalPages,
        setCurrentPageNumber(pageNumber) {
          dispatch({ type: PaginationActions.SET_CURRENT_PAGE_NUMBER, payload: { currentPageNumber: pageNumber, totalPages: state.totalPages } });
        },
        setTotalPagesCount(count) {
          dispatch({ type: PaginationActions.SET_TOTAL_PAGES, payload: { currentPageNumber: state.currentPageNumber, totalPages: count } });
        },
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
