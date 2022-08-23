import { SidebarWithHeader, Fallback } from "@/components";
import { useAuthStore } from "@/features/authentication";
import { lazyImport } from "@/utils";
import { Suspense } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { ExpensesRoutes } from "../features/expenses";
import { InvoicesRoutes } from "../features/invoices";

const { Clients } = lazyImport(() => import("@/features/misc"), "Clients");
const { Dashboard } = lazyImport(() => import("@/features/misc"), "Dashboard");
const { Home } = lazyImport(() => import("@/features/misc"), "Home");
const { Reports } = lazyImport(() => import("@/features/misc"), "Reports");
const { Settings } = lazyImport(() => import("@/features/misc"), "Settings");

function PrivateOulet() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated()) {
    return (
      <Suspense fallback={<Fallback />}>
        <SidebarWithHeader />
        <Outlet />
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
      { index: true, path: "/app/*", element: <Home /> },
      { path: "expenses/*", element: <ExpensesRoutes /> },
      { path: "invoices/*", element: <InvoicesRoutes /> },
      { path: "dashboard/*", element: <Dashboard /> },
      { path: "clients/*", element: <Clients /> },
      { path: "reports/*", element: <Reports /> },
      { path: "settings/*", element: <Settings /> },
      { path: "*", element: <Navigate to="/app" /> },
    ],
  },
];
