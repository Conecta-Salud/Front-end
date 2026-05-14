// src/stores/authStore.ts
import { create } from "zustand";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/auth/firebase";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthState = {
  firebaseUser: FirebaseUser | null;
  status: AuthStatus;

  initializeAuth: () => () => void;
  setUnauthenticated: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  status: "checking",

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        set({
          firebaseUser: null,
          status: "unauthenticated",
        });
        return;
      }

      set({
        firebaseUser,
        status: "authenticated",
      });
    });

    return unsubscribe;
  },

  setUnauthenticated: () => {
    set({
      firebaseUser: null,
      status: "unauthenticated",
    });
  },
}));