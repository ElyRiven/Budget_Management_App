/**
 * usePagination Hook
 * Reusable pagination logic extracted from components
 */

import { useState, useMemo } from 'react';
import { APP_CONFIG } from '@/core/config/app.config';

interface UsePaginationProps<T> {
  data: T[];
  pageSize?: number;
}

interface UsePaginationReturn<T> {
  pageIndex: number;
  pageSize: number;
  paginatedData: T[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
}

export const usePagination = <T,>({
  data,
  pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [pageIndex, setPageIndex] = useState(0);

  // Calculate paginated data
  const { paginatedData, totalPages } = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const paginated = data.slice(startIndex, endIndex);
    const pages = Math.ceil(data.length / pageSize);

    return {
      paginatedData: paginated,
      totalPages: pages,
    };
  }, [data, pageIndex, pageSize]);

  const hasNextPage = pageIndex < totalPages - 1;
  const hasPreviousPage = pageIndex > 0;

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setPageIndex(page);
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const resetPage = () => {
    setPageIndex(0);
  };

  return {
    pageIndex,
    pageSize,
    paginatedData,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
  };
};
