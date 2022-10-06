import { useSidebarStore } from "@/stores";
import { Box } from "@chakra-ui/react";
import React from "react";

export function AppLayoutWrapper({ children }: React.PropsWithChildren) {
  const sidebarIsOpen = useSidebarStore(state => state.isOpen);
  return (
    <Box
      transition="0.2s linear"
      pl={{
        base: 4,
        md: sidebarIsOpen ? "64" : "24",
      }}
      pr="4"
      pt="4"
      pb="4"
      h="full"
      w="full"
      as="main"
    >
      {children}
    </Box>
  );
}
