import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { makeServer } from "@/lib/mirage";
import { DEV_ENV } from "@/config";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@/lib/react-query";
import { AppRoutes } from "../routes";
import { AuthProvider } from "./AuthProvider";

export function AppProvider() {
  if (DEV_ENV) {
    makeServer();
  }
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {DEV_ENV && <ReactQueryDevtools position="bottom-right" />}
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
