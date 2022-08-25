import { IUser } from "@/types";
import {
  Flex,
  Tooltip,
  IconButton,
  Icon,
  Box,
  Heading,
  Button,
  useColorModeValue,
} from "@/lib/chakra-ui";
import { ErrorBoundary } from "react-error-boundary";
import { RiPencilLine, RiDeleteBin5Line } from "@/lib/react-icons";
import { Table } from "@/components";

interface IUsersTableProps {
  data: IUser[];
  loadingData: boolean;
  totalCountOfRegisters: number;
  registersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function ErrorFallback() {
  return (
    <div role="alert">
      <Heading>Ooops, something went wrong :( </Heading>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
}

export function UsersTable({
  currentPage,
  data,
  loadingData,
  onPageChange,
  registersPerPage,
  totalCountOfRegisters,
}: IUsersTableProps) {
  return (
    <Box
      rounded="md"
      boxShadow="md"
      p="2"
      bg={useColorModeValue("gray.200", "gray.800")}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Table<IUser>
          columns={[
            { title: "id", field: "id" },
            { title: "name", field: "name" },
            { title: "email", field: "email" },
            { title: "createdAt", field: "createdAt" },
            {
              title: "ações",
              field: "id",
              // eslint-disable-next-line react/no-unstable-nested-components
              Cell({ entry: { id } }) {
                return (
                  <Flex alignItems="center" justifyContent="center">
                    <Tooltip hasArrow label="Editar" aria-label="Edit button">
                      <IconButton
                        mr="2"
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="blue"
                        icon={<Icon as={RiPencilLine} fontSize="16" />}
                        aria-label="Edit button"
                        onClick={() => {
                          /* TODO */
                        }}
                      >
                        Editar
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      hasArrow
                      label="Excluir"
                      aria-label="Delete button"
                    >
                      <IconButton
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        icon={<Icon as={RiDeleteBin5Line} fontSize="16" />}
                        aria-label="Delete button"
                        onClick={() => {
                          /* TODO */
                        }}
                      >
                        Excluir
                      </IconButton>
                    </Tooltip>
                  </Flex>
                );
              },
            },
          ]}
          data={data}
          loadingData={loadingData}
          totalCountOfRegisters={totalCountOfRegisters}
          registersPerPage={registersPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </ErrorBoundary>
    </Box>
  );
}
