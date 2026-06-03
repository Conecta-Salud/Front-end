import { create } from "zustand";
import type { HealthMapIndicator } from "../features/health-map/types/healthMap.types";
import type { LocationSearchResult } from "../features/locations/types/locationSearch.types";

type HeaderFiltersState = {
  category: HealthMapIndicator;
  year: string;
  selectedLocation: LocationSearchResult | null;

  setCategory: (category: HealthMapIndicator) => void;
  setYear: (year: string) => void;
  setSelectedLocation: (location: LocationSearchResult | null) => void;
  resetFilters: () => void;
};

export const useHeaderFilterStore = create<HeaderFiltersState>((set) => ({
  category: "medical_coverage",
  year: "2024",
  selectedLocation: null,

  setCategory: (category) => set({ category }),
  setYear: (year) => set({ year }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  resetFilters: () =>
    set({
      category: "medical_coverage",
      year: "2024",
      selectedLocation: null,
    }),
}));