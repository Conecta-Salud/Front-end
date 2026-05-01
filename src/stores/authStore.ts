// src/stores/authStore.ts
import { create } from "zustand";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/auth/firebase";
import { getCurrentUser, type AuthUser } from "../services/auth/getCurrentUser";
import { loginWithFirebase, logoutFirebase } from "../services/auth/authService";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthState = {
  firebaseUser: FirebaseUser | null;
  user: AuthUser | null;
  status: AuthStatus;

  initializeAuth: () => () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  user: null,
  status: "checking",

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        set({
          firebaseUser: null,
          user: null,
          status: "unauthenticated",
        });
        return;
      }

      try {
        const user = await getCurrentUser();

        set({
          firebaseUser,
          user,
          status: "authenticated",
        });
      } catch (error) {
        console.error("Error loading authenticated user:", error);

        await logoutFirebase();

        set({
          firebaseUser: null,
          user: null,
          status: "unauthenticated",
        });
      }
    });

    return unsubscribe;
  },

  login: async (email, password) => {
    try {
      set({ status: "checking" });

      const firebaseUser = await loginWithFirebase(email, password);
      const user = await getCurrentUser();

      set({
        firebaseUser,
        user,
        status: "authenticated",
      });
    } catch (error) {
      set({
        firebaseUser: null,
        user: null,
        status: "unauthenticated",
      });

      throw error;
    }
  },

  logout: async () => {
    await logoutFirebase();

    set({
      firebaseUser: null,
      user: null,
      status: "unauthenticated",
    });
  },
}));