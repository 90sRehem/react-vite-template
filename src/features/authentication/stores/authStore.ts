import { createStandaloneToast } from "@chakra-ui/react";
import create from "zustand";
import { persist } from "zustand/middleware";
import { authenticate } from "../api";
import { IAuthCredentials, IAuthUser } from "../types";

const { toast } = createStandaloneToast();

type ICredentials = Omit<IAuthCredentials, "rememberMe">;

interface IAuthState2 {
  user: IAuthUser | null;
  login: (credentials: ICredentials, onSuccess: () => void) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const useAuthStore = create(
  persist<IAuthState2>(
    set => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      async login(credentials, onSuccess) {
        set({ isLoading: true });

        try {
          const response = await authenticate(credentials);
          set({ user: response });
          onSuccess();
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          toast({
            title: "Erro.",
            description: error?.response?.data?.message,
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
        set({ user: null });
      },
    }),
    {
      name: "auth-store",
    },
  ),
);

// export function useAuth(): IUseAuthData {
//   const setUser = useAuthStore(state => state.setUser);
//   const removeUser = useAuthStore(state => state.removeUser);
//   const user = useAuthStore(state => state.user);
//   const toast = useToast();

//   const loginMutation = useMutation(
//     async (credentials: IAuthCredentials) => {
//       await authenticate(credentials);
//     },
//     {
//       onError(error, variables, context) {
//         toast({
//           title: "Erro.",
//           description: error?.response?.data?.message,
//           status: "error",
//           duration: 9000,
//           isClosable: true,
//           position: "top-right",
//         });
//       },
//       onSuccess(data, variables, context) {
//         setUser(data as unknown as IUser);
//       },
//     },
//   );

//   async function login(credentials: IAuthCredentials, onSuccess: () => void) {
//     await loginMutation.mutateAsync(credentials);
//     onSuccess();
//   }

//   return {
//     user,
//     login,
//     isAuthenticated: Boolean(user),
//     logout() {
//       removeUser();
//     },
//   };
// }
