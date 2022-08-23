import { useAuth } from "@/providers/AuthProvider";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const routes = isAuthenticated ? protectedRoutes : publicRoutes;
  return useRoutes([...routes]);
}
