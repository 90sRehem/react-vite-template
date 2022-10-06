import { useAuthStore } from "@/features/authentication/stores/authStore";
import {
  Flex,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { INavItemProps } from "@/types";
import { AvatarMenuSkeleton } from "./AvatarMenuSkeleton";

interface IHeaderProps {
  links: INavItemProps[];
}

export function Header({ links = [] }: IHeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const path = useLocation();

  return (
    <>
      <Flex
        pr={{ base: 4 }}
        pl={{ base: 2 }}
        w="full"
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        transition="0.2s linear"
        as="header"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                {user ? (
                  <HStack>
                    <Avatar size="sm" src={user?.avatar || ""} />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{user?.name}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {user?.email}
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                ) : (
                  <AvatarMenuSkeleton />
                )}
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Ajustes</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Box
            transition="0.2s linear"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w="full"
            h="full"
          >
            <Flex
              h="20"
              alignItems="center"
              mx="5"
              justifyContent="space-between"
            >
              <Text
                ml="5"
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
              >
                Logo
              </Text>
              <CloseButton
                display={{ base: "flex", md: "none" }}
                onClick={onClose}
              />
            </Flex>
            <ul>
              {links.map(item => (
                <Flex
                  key={item.title}
                  align="center"
                  p="4"
                  mx="4"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  _hover={{
                    bg: "cyan.400",
                    color: "white",
                  }}
                  onClick={() => {
                    navigate(item.url);
                    onClose();
                  }}
                  bg={path.pathname.endsWith(item.url) ? "cyan.400" : ""}
                  color={path.pathname.endsWith(item.url) ? "white" : ""}
                >
                  <Icon as={item.icon} fontSize="xl" />
                  <Text ml="4">{item.title}</Text>
                </Flex>
              ))}
            </ul>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
}
