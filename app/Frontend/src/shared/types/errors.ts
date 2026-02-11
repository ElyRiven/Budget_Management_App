/**
 * Error Types
 * Proper error interfaces to replace `any` types
 */

/**
 * Base application error
 */
export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Authentication error
 */
export interface AuthError extends AppError {
  code: string;
}

/**
 * API error from backend services
 */
export interface ApiError extends AppError {
  statusCode?: number;
  endpoint?: string;
}

/**
 * Create an AuthError from unknown error
 */
export const createAuthError = (error: unknown): AuthError => {
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    return {
      code: String(error.code),
      message: String(error.message),
    };
  }
  
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
  };
};

/**
 * Create an ApiError from unknown error
 */
export const createApiError = (error: unknown): ApiError => {
  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown>;
    return {
      message: String(err.message || 'API Error'),
      code: err.code ? String(err.code) : undefined,
      statusCode: typeof err.statusCode === 'number' ? err.statusCode : undefined,
      endpoint: err.endpoint ? String(err.endpoint) : undefined,
      details: err,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    message: 'An unknown API error occurred',
    code: 'UNKNOWN_ERROR',
  };
};
