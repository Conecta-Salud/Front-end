import { create } from "zustand";

type HeaderFiltersState = {
  category: string;
  year: string;
  search: string;

  setCategory: (category: string) => void;
  setYear: (year: string) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
};

export const useHeaderFilterStore = create<HeaderFiltersState>((set) => ({
  category: "cobertura_medica",
  year: "2024",
  search: "",

  setCategory: (category) => set({ category }),
  setYear: (year) => set({ year }),
  setSearch: (search) => set({ search }),

  resetFilters: () =>
    set({
      category: "cobertura_medica",
      year: "2024",
      search: "",
    }),
}));