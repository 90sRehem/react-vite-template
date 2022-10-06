import {
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { INavItemProps } from "@/types";
import { Link } from "../Link";

export function NavItem({ icon, title, active, isOpen, url }: INavItemProps) {
  const [isDesktopView] = useMediaQuery("(max-width: 390px)");
  return (
    <ChakraLink
      as={Link}
      to={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Tooltip
        hidden={isOpen}
        hasArrow
        placement="right"
        label={title}
        zIndex={999}
      >
        <Flex
          align="center"
          p="4"
          mx="3.5"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          bg={active ? "cyan.400" : ""}
          color={active ? "white" : ""}
        >
          <Icon as={icon} fontSize="xl" />
          <Text hidden={!isOpen && !isDesktopView} ml="4">
            {title}
          </Text>
        </Flex>
      </Tooltip>
    </ChakraLink>
  );
}
