import { useAuth } from "@/features/authentication";
import { useRoutes } from "react-router-dom";
import { useAuthStore } from "@/features/authentication/stores/authStore";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

export function AppRoutes() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = Boolean(user);
  const routes = isAuthenticated ? protectedRoutes : publicRoutes;
  return useRoutes([...routes]);
}
