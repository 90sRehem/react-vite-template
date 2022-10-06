import { ReactNode, useMemo } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { FiSettings, FiBriefcase, FiCalendar, FiUser } from "react-icons/fi";
import { useSidebarStore } from "@/stores";
import { INavItemProps } from "@/types";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AppLayoutWrapper } from "../Layout";

export function SidebarWithHeader({ children }: { children: ReactNode }) {
  const sidebarIsOpen = useSidebarStore(state => state.isOpen);

  const navLinks: INavItemProps[] = useMemo(
    () => [
      { url: "/app", icon: FiCalendar, title: "Painel", isOpen: sidebarIsOpen },
      {
        url: "/app/users",
        icon: FiUser,
        title: "Usuários",
        isOpen: sidebarIsOpen,
      },
      {
        url: "/app/reports",
        icon: FiBriefcase,
        title: "Relatórios",
        isOpen: sidebarIsOpen,
      },
      {
        url: "/app/settings",
        icon: FiSettings,
        title: "Ajustes",
        isOpen: sidebarIsOpen,
      },
    ],
    [sidebarIsOpen],
  );

  return (
    <Box
      h="full"
      w="full"
      minH="100vh"
      minW="100vw"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Sidebar links={navLinks} />
      <Header links={navLinks} />
      <AppLayoutWrapper>{children}</AppLayoutWrapper>
    </Box>
  );
}
