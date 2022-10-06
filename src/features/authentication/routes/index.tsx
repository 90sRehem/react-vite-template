import { lazyImport } from "@/utils";
import { Route, Routes } from "react-router-dom";

const { PageNotFound } = lazyImport(
  () => import("@/features/misc"),
  "PageNotFound",
);
const { Login } = lazyImport(() => import("./Login"), "Login");
const { Register } = lazyImport(() => import("./Register"), "Register");

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
