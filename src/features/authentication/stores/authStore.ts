import { axios } from "@/lib/axios";
import { storage } from "@/utils";
import create from "zustand";
import { EAuthEndpoints, IAuthState, IAuthUser } from "../types";

function getFromStorage(key: string): IAuthUser | null {
  const localValues = storage.getItem({
    key,
    storageType: "local",
  }) as IAuthUser | null;
  const sessionValues = storage.getItem({
    key,
    storageType: "session",
  }) as IAuthUser | null;

  if (localValues) return localValues;
  if (sessionValues) return sessionValues;
  return null;
}

export const useAuthStore = create<IAuthState>((set, get) => ({
  authUser: null,
  status: "idle",
  isAuthenticated() {
    return !!get().getAuthUser();
  },
  getAuthUser() {
    const user = getFromStorage("user");
    set({ authUser: user });
    return user;
  },
  async login({ email, password, rememberMe }) {
    set({ status: "loading" });
    try {
      const response = await axios.post(EAuthEndpoints.LOGIN, {
        email,
        password,
      });

      console.log(response);

      if (rememberMe) {
        storage.setItem({
          key: "user",
          storageType: "local",
          values: response.data.data,
        });
      }
      storage.setItem({
        key: "user",
        storageType: "session",
        values: response.data.data,
      });
      set({ authUser: response.data.data, status: "loading" });
      window.location.reload();
    } catch (error) {
      console.log(error);
      set({ authUser: null, status: "error" });
    }
  },
  logout() {
    const localValues = storage.getItem({ key: "user", storageType: "local" });
    const sessionValues = storage.getItem({
      key: "user",
      storageType: "session",
    });

    if (localValues) {
      storage.clearItem({ key: "user", storageType: "local" });
    }
    if (sessionValues) {
      storage.clearItem({ key: "user", storageType: "session" });
    }

    set({ authUser: null });
    window.location.reload();
  },
}));
