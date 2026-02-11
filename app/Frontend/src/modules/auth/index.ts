// Store
export { useUserStore } from './store/useUserStore.ts';

// Services
export { loginWithEmail, loginWithGoogle, logout, registerWithEmail } from './services/authService.ts';

// Schemas
export { loginSchema, type LoginFormData } from './schemas/loginSchema.ts';
export { registerSchema, type RegisterFormData } from './schemas/registerSchema.ts';

// Components
export { LoginForm } from './components/LoginForm.tsx';
export { RegisterForm } from './components/RegisterForm.tsx';
export { ProtectedRoute } from './components/ProtectedRoute.tsx';
export { PublicRoute } from './components/PublicRoute.tsx';
export { AuthInitializer } from './components/AuthInitializer.tsx';

// Pages
export { LoginPage } from './pages/LoginPage.tsx';
export { RegisterPage } from './pages/RegisterPage.tsx';

// Hooks
export { useAuthStatus } from './hooks/useAuthStatus.ts';

// Context
export { AuthProvider, useAuthProvider } from './context/AuthContext.tsx';

// Interfaces & Types
export type { IAuthProvider, AuthUser, RegisterData } from './interfaces/IAuthProvider.ts';

// Adapters
export { FirebaseAuthAdapter, firebaseAuthAdapter } from './adapters/FirebaseAuthAdapter.ts';
