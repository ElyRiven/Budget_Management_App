import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthUser } from '../interfaces/IAuthProvider';

interface UserState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setUser: (user: AuthUser | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

/**
 * User Store
 * Manages authentication state
 * NOTE: No longer initializes Firebase listener on module load
 * Initialization is now explicit via AuthInitializer component
 */
export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isAuthenticated: false,
                isLoading: true,

                setUser: (user) =>
                    set({
                        user,
                        isAuthenticated: !!user,
                        isLoading: false,
                    }),

                setLoading: (loading) =>
                    set({ isLoading: loading }),

                logout: () => {
                    set({ user: null, isAuthenticated: false });
                },
            }),
            {
                name: 'user-storage',
                partialize: (state) => ({
                    user: state.user,
                }),
            }
        ),
        { name: 'User Store' }
    )
);
