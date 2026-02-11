/**
 * Application Configuration
 * Centralized configuration for constants and magic numbers
 */

export const APP_CONFIG = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // API Configuration
  API_TIMEOUT: 15000, // 15 seconds

  // Date formats
  DATE_FORMAT: {
    DISPLAY: 'dd/MM/yyyy',
    ISO: 'yyyy-MM-dd',
    FULL: 'dd/MM/yyyy HH:mm:ss',
  },

  // Currency
  CURRENCY: {
    CODE: 'COP',
    LOCALE: 'es-CO',
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
