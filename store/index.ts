import create from "zustand";
import { persist } from "zustand/middleware";
import { server } from "../config/index";
const authStore = (set: any) => ({
  userProfile: null,
  allUser: [],
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await fetch(`${server}/api/user`);
    const data = await response.json();
    // console.log(data);
    set({ allUser: data });
  },
});

export const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);
