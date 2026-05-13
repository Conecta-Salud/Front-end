import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const isUnauthorizedError = (error: unknown) => {
  return error instanceof AxiosError && error.response?.status === 401;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        if (isUnauthorizedError(error)) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});