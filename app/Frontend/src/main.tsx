import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/config/queryClient';
import { AppRouter } from './core/router/AppRouter';
import { AuthProvider } from './modules/auth/context/AuthContext';
import { AuthInitializer } from './modules/auth/components/AuthInitializer';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        <AppRouter />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

