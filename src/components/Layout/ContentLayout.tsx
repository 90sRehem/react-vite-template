import {
  ArrowBackIcon,
  Box,
  Flex,
  Heading,
  IconButton,
  Interpolation,
  keyframes,
  Stack,
  Tooltip,
  useColorModeValue,
} from "@/lib/chakra-ui";
import { ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarStore } from "@/stores";

interface ContentLayoutProps {
  children: ReactNode;
  goBackButton?: boolean;
  pageTitle?: string;
}

const forwardAnimation = keyframes`
  from {
    padding-left: 5.5rem
  }
  to {
     padding-left: 13.5rem;
  }
`;

const reverseAnimation = keyframes`
  from {
     padding-left: 13.5rem;
  }
  to {
    padding-left: 5.5rem
  }
`;

/**
 * @deprecated
 */
export function ContentLayout({
  children,
  goBackButton,
  pageTitle,
}: ContentLayoutProps) {
  const isOpen = useSidebarStore(state => state.isOpen);
  const navigate = useNavigate();

  const openAnimation = useMemo(
    (): Interpolation<unknown> => ({
      animation: isOpen
        ? `${forwardAnimation} 0.2s linear forwards`
        : `${reverseAnimation} 0.2s linear forwards`,
    }),
    [isOpen],
  );

  return (
    <Stack
      bg={useColorModeValue("gray.100", "gray.900")}
      pt="20"
      h="full"
      w="full"
      minH="100vh"
      minW="100vw"
      as="main"
    >
      <>
        {goBackButton || pageTitle ? (
          <Flex p="2">
            {goBackButton ? (
              <Tooltip hasArrow>
                <IconButton
                  variant="outline"
                  aria-label="go back"
                  icon={<ArrowBackIcon />}
                  size="lg"
                  onClick={() => navigate(-1)}
                />
              </Tooltip>
            ) : null}
            {pageTitle ? <Heading ml="2">{pageTitle}</Heading> : null}
          </Flex>
        ) : null}
        <Box css={openAnimation}>{children}</Box>
      </>
    </Stack>
  );
}
