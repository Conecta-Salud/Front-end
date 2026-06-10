type AdminLoadMoreFooterProps = Readonly<{
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadedCount: number;
  loadingLabel: string;
  loadMoreLabel: string;
  completedLabel: string;
  errorLabel?: string;
  isError?: boolean;
  onLoadMore: () => void;
}>;

const getFooterContent = ({
  hasNextPage,
  isFetchingNextPage,
  loadedCount,
  loadingLabel,
  loadMoreLabel,
  completedLabel,
  onLoadMore,
}: AdminLoadMoreFooterProps) => {
  if (isFetchingNextPage) {
    return <span>{loadingLabel}</span>;
  }

  if (hasNextPage) {
    return (
      <button
        type="button"
        onClick={onLoadMore}
        className="rounded-[6px] border border-gray-200 px-3 py-1.5 text-black transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#57D8BE] focus:ring-offset-2"
      >
        {loadMoreLabel}
      </button>
    );
  }

  if (loadedCount > 0) {
    return <span>{completedLabel}</span>;
  }

  return null;
};

export default function AdminLoadMoreFooter({
  hasNextPage,
  isFetchingNextPage,
  loadedCount,
  loadingLabel,
  loadMoreLabel,
  completedLabel,
  errorLabel,
  isError = false,
  onLoadMore,
}: AdminLoadMoreFooterProps) {
  const footerContent = getFooterContent({
    hasNextPage,
    isFetchingNextPage,
    loadedCount,
    loadingLabel,
    loadMoreLabel,
    completedLabel,
    errorLabel,
    isError,
    onLoadMore,
  });

  return (
    <>
      <div className="flex min-h-10 items-center justify-center py-2 text-[14px] text-gray-500">
        {footerContent}
      </div>

      {isError && loadedCount > 0 && errorLabel && (
        <p className="pb-2 text-center text-[14px] text-red-500">
          {errorLabel}
        </p>
      )}
    </>
  );
}
