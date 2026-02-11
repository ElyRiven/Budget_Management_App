/**
 * Formatting Utilities
 * Shared formatting functions for currency, dates, etc.
 */

import { APP_CONFIG } from '@/core/config/app.config';

/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
    style: 'currency',
    currency: APP_CONFIG.CURRENCY.CODE,
  }).format(amount);
};
