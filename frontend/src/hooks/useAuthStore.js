import { create } from 'zustand';

const useAuthStore = create((set) => ({
  currentUser: null,
  token: null,
  role: null, // 'normal', 'corporate', 'captain', 'admin'

  setAuth: (user, token, role) => set({ currentUser: user, token, role }),
  logout: () => set({ currentUser: null, token: null, role: null }),
}));

export default useAuthStore;
