import { useEffect, useRef, type RefObject } from "react";

type InfiniteScrollLoadOptions = {
  rootRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
};

export function useInfiniteScrollLoad({
  rootRef,
  enabled,
  isLoading,
  onLoadMore,
  rootMargin = "240px",
}: InfiniteScrollLoadOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sentinel = sentinelRef.current;

    if (!root || !sentinel || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);

        if (isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      {
        root,
        rootMargin,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [enabled, isLoading, onLoadMore, rootMargin, rootRef]);

  return sentinelRef;
}
