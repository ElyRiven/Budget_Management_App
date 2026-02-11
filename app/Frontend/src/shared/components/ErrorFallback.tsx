/**
 * ErrorFallback Component
 * Reusable fallback UI for error states
 */

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
}

export const ErrorFallback = ({
  error,
  resetError,
  title = 'Error',
  message = 'Ha ocurrido un error. Por favor, intenta de nuevo.',
}: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">{message}</p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <summary className="text-sm font-medium text-gray-700 cursor-pointer">
              Detalles del error
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
        {resetError && (
          <button
            onClick={resetError}
            className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};
