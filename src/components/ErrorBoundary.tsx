import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const TeamLeadErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const { theme } = useTheme();

  if (hasError) {
    return (
      <div className={`min-h-[600px] flex flex-col items-center justify-center p-12 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
        <AlertCircle className={`h-20 w-20 text-red-500 mb-6 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
        <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Something went wrong</h2>
        <p className={`text-gray-500 mb-8 max-w-md text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          There was an error loading the Team Lead dashboard. Please try refreshing.
        </p>
        {error && (
          <details className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border'}`}>
            <summary className={`cursor-pointer font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Technical details</summary>
            <pre className={`mt-2 text-xs text-red-400 overflow-auto max-h-40 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
              {error.message}
            </pre>
          </details>
        )}
        <button
          onClick={() => {
            setHasError(false);
            setError(null);
            window.location.reload();
          }}
          className={`px-8 py-3 bg-[#1976D2] text-white rounded-xl font-bold hover:bg-[#1565C0] transition-all shadow-lg shadow-blue-500/20 flex items-center space-x-2`}
        >
          <span>Reload Dashboard</span>
        </button>
      </div>
    );
  }

  try {
    return React.useMemo(() => children as React.ReactElement, [children]) as React.ReactElement;
  } catch (err) {
    setHasError(true);
    setError(err as Error);
    return null;
  }
};

export default TeamLeadErrorBoundary;

