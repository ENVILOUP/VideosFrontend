import { create } from "zustand";

interface AuthStore {
	isAuthenticated: boolean;
	setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}));