import { axios, AxiosError } from "@/lib/axios";
import { storage } from "@/utils";
import create from "zustand";
import { createStandaloneToast } from "@chakra-ui/react";
import { useNotificationStore } from "@/stores/notifications";
import { authenticate } from "../api";
import { EAuthEndpoints, IAuthState, IAuthUser } from "../types";

const { toast } = createStandaloneToast();

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

const authUser = getFromStorage("user");

export const useAuthStore = create<IAuthState>((set, get) => ({
  authUser,
  status: "idle",
  async login({ email, password, rememberMe }, onSuccess) {
    set({ status: "loading" });
    try {
      const user = await authenticate({ email, password });
      if (rememberMe) {
        storage.setItem({
          key: "user",
          storageType: "local",
          values: user,
        });
      }
      storage.setItem({
        key: "user",
        storageType: "session",
        values: user,
      });
      set({ authUser: user, status: "idle" });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro",
        status: "error",
        description: error?.response.data.message,
        position: "top-right",
        isClosable: true,
      });

      set({ authUser: null, status: "error" });
    } finally {
      set({ status: "idle" });
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
