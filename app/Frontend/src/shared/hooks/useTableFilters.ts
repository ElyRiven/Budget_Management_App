/**
 * useTableFilters Hook
 * Reusable table filtering logic extracted from components
 */

import { useState, useMemo, useCallback } from 'react';

interface UseTableFiltersProps<T> {
  data: T[];
  searchFields?: (keyof T)[];
}

interface UseTableFiltersReturn<T> {
  filteredData: T[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: Map<string, Set<string>>;
  setFilter: (filterKey: string, values: Set<string>) => void;
  clearFilter: (filterKey: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export const useTableFilters = <T extends Record<string, unknown>>({
  data,
  searchFields = [],
}: UseTableFiltersProps<T>): UseTableFiltersReturn<T> => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Map<string, Set<string>>>(new Map());

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });

      // Column filters
      const matchesFilters = Array.from(selectedFilters.entries()).every(
        ([filterKey, filterValues]) => {
          if (filterValues.size === 0) return true;
          const itemValue = item[filterKey as keyof T];
          return filterValues.has(String(itemValue));
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, searchFields, selectedFilters]);

  const setFilter = useCallback((filterKey: string, values: Set<string>) => {
    setSelectedFilters((prev) => {
      const newFilters = new Map(prev);
      newFilters.set(filterKey, values);
      return newFilters;
    });
  }, []);

  const clearFilter = useCallback((filterKey: string) => {
    setSelectedFilters((prev) => {
      const newFilters = new Map(prev);
      newFilters.delete(filterKey);
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFilters(new Map());
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== '' || selectedFilters.size > 0;
  }, [searchQuery, selectedFilters]);

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    selectedFilters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  };
};
