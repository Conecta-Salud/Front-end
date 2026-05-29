// src/app/main.tsx
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

import "../styles/global.css";

import App from "./App";
import { queryClient } from "../lib/queryClient";

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : null;

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {ReactQueryDevtools && (
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    )}
  </QueryClientProvider>
);
