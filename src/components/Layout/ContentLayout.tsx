import { Stack, useColorModeValue } from "@/lib/chakra-ui";
import { ReactNode } from "react";
import { useSidebarSizeStore } from "../Sidebar/stores/sidebarSizeStore";

interface ContentLayoutProps {
  children: ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  const { navSize } = useSidebarSizeStore();

  return (
    <Stack
      bg={useColorModeValue("gray.100", "gray.900")}
      pl={navSize === "large" ? "52" : "20"}
      pt="20"
      h="full"
      w="full"
      minH="100vh"
      minW="100vw"
    >
      {children}
    </Stack>
  );
}
