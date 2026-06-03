type AdminPageResponse = {
  items: unknown[];
  page?: number;
  size?: number;
  totalItems?: number;
  totalPages?: number;
};

export function getNextAdminPageParam<TPage extends AdminPageResponse>(
  lastPage: TPage,
  allPages: TPage[],
  requestedPageSize: number
) {
  const currentPage =
    typeof lastPage.page === "number" ? lastPage.page : allPages.length - 1;

  if (typeof lastPage.totalPages === "number") {
    const nextPage = currentPage + 1;
    return nextPage < lastPage.totalPages ? nextPage : undefined;
  }

  if (typeof lastPage.totalItems === "number") {
    const loadedItems = allPages.reduce(
      (total, page) => total + page.items.length,
      0
    );

    return loadedItems < lastPage.totalItems ? currentPage + 1 : undefined;
  }

  const pageSize = lastPage.size ?? requestedPageSize;
  return lastPage.items.length >= pageSize ? currentPage + 1 : undefined;
}

export function flattenAdminPages<TItem>(
  pages?: Array<{ items: TItem[] }>
): TItem[] {
  return pages?.flatMap((page) => page.items) ?? [];
}
