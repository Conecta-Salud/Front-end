import CustomButton from "../../../components/ui/Button/Button";

type AdminPaginationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading?: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

export default function AdminPagination({
  hasNextPage,
  hasPreviousPage,
  isLoading = false,
  onNextPage,
  onPreviousPage,
}: AdminPaginationProps) {
  return (
    <div className="flex min-h-10 items-center justify-center gap-3 py-2">
      <CustomButton
        label="Anterior"
        disabled={!hasPreviousPage || isLoading}
        onClick={onPreviousPage}
        height="40"
        textSize="md"
      />

      <CustomButton
        label="Siguiente"
        disabled={!hasNextPage || isLoading}
        onClick={onNextPage}
        height="40"
        textSize="md"
      />
    </div>
  );
}
