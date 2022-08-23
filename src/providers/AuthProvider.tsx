import {
  IAuthUser,
  IAuthCredentials,
  authenticate,
} from "@/features/authentication";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMutation } from "@/lib/react-query";
import { storage } from "@/utils";
import { useToast } from "@chakra-ui/react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: IAuthUser | null;
  login: (
    credentials: IAuthCredentials,
    // onSuccess: () => void,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  success: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function getFromStorage(key: string) {
  const localValues = storage.getItem({ key, storageType: "local" });
  const sessionValues = storage.getItem({ key, storageType: "session" });
  const userSettings = storage.getItem({
    key: "settings",
    storageType: "local",
  });

  if (localValues) {
    return { ...localValues, settings: userSettings };
  }
  if (sessionValues) {
    return { ...sessionValues, settings: userSettings };
  }

  return null;
}
function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const toast = useToast();

  const [user, setUser] = useState<IAuthUser>(() => {
    const storagedUser = getFromStorage("user") as IAuthUser;

    if (storagedUser) {
      return storagedUser;
    }

    return {} as IAuthUser;
  });

  const isAuthenticated = !!Object.keys(user).length;

  const mutation = useMutation(
    async (formData: IAuthCredentials) => {
      return authenticate(formData);
    },
    {
      onError(error) {
        console.log(error);
        toast({
          title: "Error.",
          description: "Something wrong happened.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess(data, variables) {
        setUser(data as IAuthUser);
        if (variables.rememberMe) {
          storage.setItem({ key: "user", storageType: "local", values: data });
        }
        storage.setItem({ key: "user", storageType: "session", values: data });
      },
    },
  );

  const login = useCallback(
    async (data: IAuthCredentials) => {
      try {
        await mutation.mutateAsync(data);
        mutation.reset();
      } catch (error) {
        console.log(error);
      }
    },
    [mutation],
  );

  const logout = useCallback(() => {
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

    setUser({} as IAuthUser);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      loading: mutation.isLoading,
      success: mutation.isSuccess,
      user,
      login,
      logout,
    }),
    [
      isAuthenticated,
      login,
      logout,
      mutation.isLoading,
      mutation.isSuccess,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthPovider");
  }

  return context;
}

export { AuthProvider, useAuth };
