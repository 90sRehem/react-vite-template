import { useSidebarStore } from "@/stores";
import { BoxProps, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { MdOutlineMenuOpen, MdOutlineMenu } from "react-icons/md";
import { INavItemProps } from "@/types";
import { NavItems } from "./NavItems";

interface SidebarProps extends BoxProps {
  links?: INavItemProps[];
}

function RenderMenuIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? <MdOutlineMenuOpen size={25} /> : <MdOutlineMenu size={25} />;
}

export function Sidebar({ links = [], ...rest }: SidebarProps) {
  const toggleNavSize = useSidebarStore(state => state.toggleNavSize);
  const isOpen = useSidebarStore(state => state.isOpen);
  return (
    <Box
      as="aside"
      transition="0.2s linear"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: isOpen ? "60" : "20" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="5" justifyContent="space-between">
        <IconButton
          display={{ base: "none", md: "flex" }}
          background="none"
          my={6}
          _hover={{ background: "none" }}
          icon={<RenderMenuIcon isOpen={isOpen} />}
          onClick={toggleNavSize}
          aria-label="expand-menu"
        />
        <Text ml="5" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>
      <NavItems items={links} />
    </Box>
  );
}
