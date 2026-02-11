/**
 * Auth Service
 * Business logic for authentication operations
 * Now uses the abstraction layer instead of Firebase directly
 */

import { firebaseAuthAdapter } from '../adapters/FirebaseAuthAdapter';
import type { AuthUser, RegisterData } from '../interfaces/IAuthProvider';

// Get the auth provider (could be injected for DI)
const authProvider = firebaseAuthAdapter;

/**
 * Login with Email and Password
 */
export const loginWithEmail = async (
    email: string,
    password: string
): Promise<AuthUser> => {
    return authProvider.signInWithEmail(email, password);
};

/**
 * Login with Google
 */
export const loginWithGoogle = async (): Promise<AuthUser> => {
    return authProvider.signInWithGoogle();
};

/**
 * Register with Email and Password
 */
export const registerWithEmail = async (
    displayName: string,
    email: string,
    password: string
): Promise<AuthUser> => {
    const registerData: RegisterData = {
        displayName,
        email,
        password,
    };
    return authProvider.signUp(registerData);
};

/**
 * Logout
 */
export const logout = async (): Promise<void> => {
    return authProvider.signOut();
};
