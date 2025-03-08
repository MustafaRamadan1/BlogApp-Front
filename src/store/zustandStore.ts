import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface BearState {
  user: User;
  updateUser: (user: User) => void;
}

let user: User;

if (localStorage.getItem("user") !== undefined) {
  user = JSON.parse(localStorage.getItem("user")!);
}

const useUserStore = create<BearState>()((set) => ({
  user: {
    name: user ? user?.name : "",
    email: user ? user?.email : ""
  },
  updateUser: (user: User) => set((state) => ({ ...state, user }))
}));

export default useUserStore;
