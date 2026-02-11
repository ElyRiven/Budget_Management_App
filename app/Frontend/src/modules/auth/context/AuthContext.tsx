/**
 * AuthContext - Dependency Injection for Auth Provider
 * Allows swapping auth implementations without changing components
 */

import { createContext, useContext, type ReactNode } from 'react';
import type { IAuthProvider } from '../interfaces/IAuthProvider';
import { firebaseAuthAdapter } from '../adapters/FirebaseAuthAdapter';

const AuthContext = createContext<IAuthProvider | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  authProvider?: IAuthProvider;
}

/**
 * AuthProvider component
 * Provides the auth implementation to the component tree
 */
export const AuthProvider = ({ 
  children, 
  authProvider = firebaseAuthAdapter 
}: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={authProvider}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access the auth provider
 */
export const useAuthProvider = (): IAuthProvider => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthProvider must be used within AuthProvider');
  }
  return context;
};
