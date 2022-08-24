import {
  Flex,
  Heading,
  Spinner,
  Tooltip,
  IconButton,
  Icon,
  Box,
  Button,
} from "@/lib/chakra-ui";
import { RiPencilLine, RiDeleteBin5Line } from "@/lib/react-icons";
import { useState } from "react";
import { Pagination } from "@/components";
import { Table } from "@/components/Table";
import { ErrorBoundary } from "react-error-boundary";
import { IUser } from "@/types";
import { useUsers } from "../api";

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

export function UsersList() {
  const [page, setPage] = useState(1);
  const [registersPerPage] = useState(20);
  const { data, isLoading, isFetching } = useUsers({
    page,
    limit: registersPerPage,
  });

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="pGray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isLoading && isFetching && (
                <Spinner size="sm" color="500.gray" ml="4" />
              )}
            </Heading>
          </Flex>

          <Box rounded="md" bg="gray.200" boxShadow="md" p="2">
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
                          <Tooltip
                            hasArrow
                            label="Editar"
                            aria-label="Edit button"
                          >
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
                              icon={
                                <Icon as={RiDeleteBin5Line} fontSize="16" />
                              }
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
                data={data?.users as IUser[]}
                loadingData={isLoading}
              />
              {data?.users && (
                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  registersPerPage={registersPerPage}
                  currentPage={page}
                  onPageChange={setPage}
                />
              )}
            </ErrorBoundary>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
