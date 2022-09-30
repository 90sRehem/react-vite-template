import { useAuth } from "@/features/authentication";
import { useRoutes } from "react-router-dom";
import { useAuthStore } from "@/features/authentication/stores/authStore";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

export function AppRoutes() {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = useAuthStore.getState().authUser;
  // console.log(teste);
  // const isAuthenticated = !!teste;
  const routes = isAuthenticated ? protectedRoutes : publicRoutes;
  return useRoutes([...routes]);
}
