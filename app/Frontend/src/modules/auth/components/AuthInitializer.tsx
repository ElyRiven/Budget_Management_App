/**
 * AuthInitializer Component
 * Explicitly initializes auth state listener in React lifecycle
 * Replaces module-level side effects from useUserStore
 */

import { useEffect } from 'react';
import { useAuthProvider } from '../context/AuthContext';
import { useUserStore } from '../store/useUserStore';

export const AuthInitializer = () => {
  const authProvider = useAuthProvider();
  const { setUser, setLoading } = useUserStore();

  useEffect(() => {
    // Set loading state
    setLoading(true);

    // Initialize auth state listener
    const unsubscribe = authProvider.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup: unsubscribe on unmount
    return () => {
      unsubscribe();
    };
  }, [authProvider, setUser, setLoading]);

  // This component doesn't render anything
  return null;
};
