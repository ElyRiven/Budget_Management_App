/**
 * Authentication Provider Interface
 * Abstraction layer to decouple from Firebase and allow easy provider swapping
 */

import type { User as FirebaseUser } from 'firebase/auth';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

/**
 * Authentication Provider Interface
 * Any auth provider (Firebase, Auth0, Supabase, etc.) must implement this
 */
export interface IAuthProvider {
  /**
   * Initialize auth state listener
   * @param callback Function called when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;

  /**
   * Sign in with email and password
   */
  signInWithEmail(email: string, password: string): Promise<AuthUser>;

  /**
   * Sign in with Google
   */
  signInWithGoogle(): Promise<AuthUser>;

  /**
   * Sign up with email and password
   */
  signUp(data: RegisterData): Promise<AuthUser>;

  /**
   * Sign out current user
   */
  signOut(): Promise<void>;

  /**
   * Get current user
   */
  getCurrentUser(): AuthUser | null;
}

/**
 * Convert Firebase User to AuthUser
 */
export const mapFirebaseUserToAuthUser = (firebaseUser: FirebaseUser | null): AuthUser | null => {
  if (!firebaseUser) return null;
  
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  };
};
