import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, signInWithGoogle, logout } from "../config/firebaseConfig";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      uuid: null,

      login: async () => {
        set({ loading: true });
        const user = await signInWithGoogle();
        console.log("User logged in:", user);
        set({ uuid: user.uid, user, loading: false });
      },

      logout: async () => {
        console.log("User logged out");
        await logout();
        set({ user: null, uuid: null });
      },
    }),
    {
      name: "auth-storage", // Local storage key
      getStorage: () => localStorage, // Persist data
    }
  )
);

export default useAuthStore;
