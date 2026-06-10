import React from "react";

export type TableAlign = "left" | "center" | "right";

export interface RankingTableBaseRow {
  id: string | number;
  extra?: Record<string, unknown>;
  [key: string]: unknown;
}

export type RankingColumn<T extends RankingTableBaseRow> = Readonly<{
  header: string;
  key: keyof T | string;
  align?: TableAlign;
  truncate?: boolean;
  maxWidth?: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}>;

export type RankingTableProps<T extends RankingTableBaseRow> = Readonly<{
  columns: RankingColumn<T>[];
  data: T[];
  compact?: boolean;
  rowHeight?: "sm" | "md" | "lg";
  emptyMessage?: string;
  className?: string;
}>;

export type RankingTableCardProps<T extends RankingTableBaseRow> = Readonly<{
  title: string;
  columns: RankingColumn<T>[];
  data: T[];
  footerText?: string;
  onFooterClick?: () => void;
  className?: string;
  emptyMessage?: string;
}>;

export type RankingTableModalProps<T extends RankingTableBaseRow> = Readonly<{
  isOpen: boolean;
  title: string;
  columns: RankingColumn<T>[];
  data: T[];
  onClose: () => void;
  emptyMessage?: string;
  className?: string;
}>;
