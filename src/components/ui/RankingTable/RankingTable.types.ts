import React from "react";

export type TableAlign = "left" | "center" | "right";

export interface RankingColumn<T> {
  header: string;
  key: keyof T;
  align?: TableAlign;
  truncate?: boolean;
  maxWidth?: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface RankingTableBaseRow {
  id: string | number;
}

export interface RankingTableProps<T extends RankingTableBaseRow> {
  columns: RankingColumn<T>[];
  data: T[];
  compact?: boolean;
  rowHeight?: "sm" | "md" | "lg";
  emptyMessage?: string;
  className?: string;
}

export interface RankingTableCardProps<T extends RankingTableBaseRow> {
  title: string;
  columns: RankingColumn<T>[];
  data: T[];
  footerText?: string;
  onFooterClick?: () => void;
  className?: string;
  emptyMessage?: string;
}

export interface RankingTableModalProps<T extends RankingTableBaseRow> {
  isOpen: boolean;
  title: string;
  columns: RankingColumn<T>[];
  data: T[];
  onClose: () => void;
  emptyMessage?: string;
  className?: string;
}