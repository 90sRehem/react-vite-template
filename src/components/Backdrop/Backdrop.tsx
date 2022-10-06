import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";

interface IBackdropProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Backdrop({ isOpen, onClose = () => { } }: IBackdropProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="75%"
        backdropBlur="2px"
      />
      <ModalContent backdropBlur="2xl" background="transparent" w="fit-content">
        <Flex w="full" h="full" alignItems="center" justify="space-between">
          <Spinner
            mr="2"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="blue.500">Carregando...</Text>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
