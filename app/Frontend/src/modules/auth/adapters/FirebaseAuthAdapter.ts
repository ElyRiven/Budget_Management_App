/**
 * Firebase Authentication Adapter
 * Implements IAuthProvider using Firebase Auth SDK
 */

import {
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/core/config/firebase.config';
import type { IAuthProvider, AuthUser, RegisterData } from '../interfaces/IAuthProvider';
import { mapFirebaseUserToAuthUser } from '../interfaces/IAuthProvider';
import { createAuthError } from '@/shared/types/errors';

export class FirebaseAuthAdapter implements IAuthProvider {
  /**
   * Listen to auth state changes
   */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      const authUser = mapFirebaseUserToAuthUser(firebaseUser);
      callback(authUser);
    });
  }

  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authUser = mapFirebaseUserToAuthUser(userCredential.user);
      if (!authUser) {
        throw new Error('Failed to map user');
      }
      console.log('[Firebase Auth] Login successful:', authUser.email);
      return authUser;
    } catch (error: unknown) {
      console.error('[Firebase Auth] Login error:', error);
      throw this.mapError(error);
    }
  }

  /**
   * Sign in with Google popup
   */
  async signInWithGoogle(): Promise<AuthUser> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const authUser = mapFirebaseUserToAuthUser(userCredential.user);
      if (!authUser) {
        throw new Error('Failed to map user');
      }
      console.log('[Firebase Auth] Google login successful:', authUser.email);
      return authUser;
    } catch (error: unknown) {
      console.error('[Firebase Auth] Google login error:', error);
      throw this.mapError(error);
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(data: RegisterData): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.displayName,
      });

      const authUser = mapFirebaseUserToAuthUser(userCredential.user);
      if (!authUser) {
        throw new Error('Failed to map user');
      }
      console.log('[Firebase Auth] Registration successful:', authUser.email);
      return authUser;
    } catch (error: unknown) {
      console.error('[Firebase Auth] Registration error:', error);
      throw this.mapError(error);
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      console.log('[Firebase Auth] Logout successful');
    } catch (error: unknown) {
      console.error('[Firebase Auth] Logout error:', error);
      throw new Error('Error al cerrar sesión');
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): AuthUser | null {
    return mapFirebaseUserToAuthUser(auth.currentUser);
  }

  /**
   * Map Firebase errors to user-friendly messages
   */
  private mapError(error: unknown): Error {
    const authError = createAuthError(error);
    const errorCode = authError.code;

    const errorMessages: Record<string, string> = {
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-credential': 'Credenciales incorrectas',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/popup-closed-by-user': 'Inicio de sesión cancelado',
      'auth/cancelled-popup-request': 'Inicio de sesión cancelado',
      'auth/email-already-in-use': 'El correo electrónico ya está en uso',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/operation-not-allowed': 'El registro con correo y contraseña está deshabilitado',
    };

    const message = errorMessages[errorCode] || 'Error de autenticación. Intenta de nuevo.';
    return new Error(message);
  }
}

// Singleton instance
export const firebaseAuthAdapter = new FirebaseAuthAdapter();
