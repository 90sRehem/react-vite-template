import { Flex, Spinner, Text } from "@chakra-ui/react";

export function Loader() {
  return (
    <Flex w="full" h="100vh" alignItems="center" justify="center">
      <Spinner size="xl" />
      <Text>Carregando...</Text>
    </Flex>
  );
}
