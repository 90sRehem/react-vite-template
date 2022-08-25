import {
  Box,
  Heading,
  Text,
  CheckCircleIcon,
  useColorModeValue,
  Flex,
  CloseIcon,
  InfoIcon,
  WarningTwoIcon,
} from "@/lib/chakra-ui";

export interface IFallBackCardProps {
  type: "success" | "error" | "info" | "warning";
  headingText: string;
  descriptionText: string;
}

const icons = {
  success: <CheckCircleIcon boxSize="50px" color="green.500" />,
  error: <InfoIcon boxSize="50px" color="blue.500" />,
  info: <CloseIcon boxSize="20px" color="white" />,
  warning: <WarningTwoIcon boxSize="50px" color="orange.300" />,
};

export function FallbackCard({
  descriptionText,
  headingText,
  type,
}: IFallBackCardProps) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        textAlign="center"
        py={10}
        px={6}
        w="xl"
        rounded="md"
        bg={useColorModeValue("gray.200", "gray.800")}
      >
        {icons[type]}
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {headingText}
        </Heading>
        <Text color="gray.500">{descriptionText}</Text>
      </Box>
    </Flex>
  );
}
