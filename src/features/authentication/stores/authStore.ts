import { createStandaloneToast } from "@chakra-ui/react";
import create from "zustand";
import { persist } from "zustand/middleware";
import { authenticate } from "../api";
import { IAuthCredentials, IAuthUser } from "../types";

const { toast } = createStandaloneToast();

type ICredentials = Omit<IAuthCredentials, "rememberMe">;
type ISetUser = IAuthUser | null;

interface IAuthState {
  user: IAuthUser | null;
  isLoading: boolean;
  login: (credentials: ICredentials, onSuccess: () => void) => Promise<void>;
  logout: () => void;
  setUser: (user: ISetUser) => void;
}

export const useAuthStore = create(
  persist<IAuthState>(
    set => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      setUser(user) {
        set(state => ({ ...state, user }));
      },
      async login(credentials, onSuccess) {
        set(state => ({ ...state, isLoading: true }));

        try {
          const response = await authenticate(credentials);
          set(state => ({ ...state, user: response }));
          onSuccess();
          set(state => ({ ...state, isLoading: false }));
        } catch (error: any) {
          set(state => ({ ...state, isLoading: false }));
          toast({
            title: "Erro.",
            description: error.response.data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: window.matchMedia("(max-width: 768px)").matches
              ? "bottom"
              : "top-right",
          });
          console.log(error);
        }
      },
      logout() {
        set(state => ({ ...state, user: null }));
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
