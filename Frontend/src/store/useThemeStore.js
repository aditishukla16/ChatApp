import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "light", // default theme
  setTheme: (newTheme) => set({ theme: newTheme }),
}));
