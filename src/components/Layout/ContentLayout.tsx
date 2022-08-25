import {
  ArrowBackIcon,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
  useColorModeValue,
} from "@/lib/chakra-ui";
import { ReactNode } from "react";
import { useSidebarSizeStore } from "../Sidebar/stores/sidebarSizeStore";

interface ContentLayoutProps {
  children: ReactNode;
  goBackButton?: boolean;
  pageTitle?: string;
}

export function ContentLayout({
  children,
  goBackButton,
  pageTitle,
}: ContentLayoutProps) {
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
      <>
        <Flex p="2">
          {goBackButton && (
            <Tooltip hasArrow>
              <IconButton
                variant="outline"
                aria-label="go back"
                icon={<ArrowBackIcon />}
                size="lg"
              />
            </Tooltip>
          )}
          {pageTitle && <Heading ml="2">{pageTitle}</Heading>}
        </Flex>
        {children}
      </>
    </Stack>
  );
}
