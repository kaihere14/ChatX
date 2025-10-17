import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "Arman", _id: "123", age: 25 },
  isLogin: false,
  isLoading: false,
  login: () => {
    console.log('logged in');
   set({isLogin : true , isLoading:false});
  },
}));
