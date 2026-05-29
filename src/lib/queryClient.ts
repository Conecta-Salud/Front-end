import { QueryClient } from "@tanstack/react-query";

const isUnauthorizedError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;

  const response = (error as { response?: { status?: number } }).response;

  return response?.status === 401;
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
