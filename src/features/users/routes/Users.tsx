import { ContentLayout } from "@/components";
import { Button, Heading } from "@/lib/chakra-ui";
import { ErrorBoundary } from "react-error-boundary";
import { UsersList } from "../components";

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

export function Users() {
  return (
    <ContentLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UsersList />
      </ErrorBoundary>
    </ContentLayout>
  );
}
