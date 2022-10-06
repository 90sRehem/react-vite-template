import { Backdrop, SidebarWithHeader } from "@/components";
import { IAuthUser } from "@/features/authentication";
import { useAuthStore } from "@/features/authentication/stores/authStore";
import { lazyImport } from "@/utils";
import { Suspense } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

const { Dashboard } = lazyImport(() => import("@/features/misc"), "Dashboard");
const { PageNotFound } = lazyImport(
  () => import("@/features/misc"),
  "PageNotFound",
);
const { Reports } = lazyImport(() => import("@/features/misc"), "Reports");
const { Settings } = lazyImport(() => import("@/features/misc"), "Settings");
const { UsersRoutes } = lazyImport(
  () => import("@/features/users"),
  "UsersRoutes",
);

function PrivateOulet() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = Object.keys(user as IAuthUser).includes("id");
  if (isAuthenticated) {
    return (
      <Suspense fallback={<Backdrop isOpen />}>
        <SidebarWithHeader>
          <Outlet />
        </SidebarWithHeader>
      </Suspense>
    );
  }
  return <Navigate to="/" />;
}

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PrivateOulet />,
    children: [
      { index: true, path: "/app", element: <Dashboard /> },
      { path: "/app/users/*", element: <UsersRoutes /> },
      { path: "/app/reports/*", element: <Reports /> },
      { path: "/app/settings/*", element: <Settings /> },
      { path: "/app/*", element: <PageNotFound /> },
      { path: "*", element: <PageNotFound /> },
      { path: "/", element: <Navigate to="/app" replace /> },
    ],
  },
];
