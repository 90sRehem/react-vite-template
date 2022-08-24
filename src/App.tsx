import { BrowserRouter } from "react-router-dom";
import { Button, ChakraProvider, Heading } from "@/lib/chakra-ui";
import { makeServer } from "@/lib/mirage";
import { DEV_ENV } from "@/config";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@/lib/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "@/lib/react-error-boundary";
import { AuthProvider } from "./features/authentication";
import { AppRoutes } from "./routes";
import { Fallback } from "./components";

function ErrorFallback() {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <Heading>Ooops, something went wrong :( </Heading>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
}

export function App() {
  if (DEV_ENV) {
    makeServer();
  }
  return (
    <Suspense fallback={<Fallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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
      </ErrorBoundary>
    </Suspense>
  );
}
