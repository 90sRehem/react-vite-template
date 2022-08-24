import {
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "../Link";
import { NavHoverBox } from "./NavHoverBox";
import { INavItemProps } from "./types";

export function NavItem({
  icon,
  title,
  description,
  active,
  navSize,
  url,
}: INavItemProps) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <ChakraLink
          as={Link}
          backgroundColor={active ? "#AEC8CA" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : ""}
          to={url}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </ChakraLink>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox
            title={title}
            icon={icon}
            description={description || ""}
          />
        </MenuList>
      </Menu>
    </Flex>
  );
}
