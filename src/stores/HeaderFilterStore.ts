import { create } from "zustand";
import type { HealthMapIndicator } from "../components/HealthMap/healthMap.types";

type HeaderFiltersState = {
  category: HealthMapIndicator;
  year: string;
  search: string;

  setCategory: (category: HealthMapIndicator) => void;
  setYear: (year: string) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
};

export const useHeaderFilterStore = create<HeaderFiltersState>((set) => ({
  category: "medical_coverage",
  year: "2024",
  search: "",

  setCategory: (category) => set({ category }),
  setYear: (year) => set({ year }),
  setSearch: (search) => set({ search }),

  resetFilters: () =>
    set({
      category: "medical_coverage",
      year: "2024",
      search: "",
    }),
}));