import {
  Flex,
  Heading,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
  Tooltip,
  IconButton,
  Icon,
  Box,
  Button,
} from "@/lib/chakra-ui";
import { RiPencilLine, RiDeleteBin5Line } from "@/lib/react-icons";
import { useState } from "react";
import { Pagination } from "@/components";
import { ErrorBoundary } from "react-error-boundary";
import { useUsers } from "../api";

// const isLoading = false;
// const isFetching = false;
const isWiderVersion = true;

function ErrorFallback() {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <Heading>:( </Heading>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
}

export function UsersList() {
  const [page, setPage] = useState(1);
  const [registersPerPage, setRegistersPerPage] = useState(10);
  const { data, isLoading, isFetching, error } = useUsers({
    page,
    limit: registersPerPage,
  });
  // console.log(data);
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

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Usuário</Th>
                  <Th>Email</Th>
                  {isWiderVersion && <Th>Data de cadastro</Th>}
                  <Th textAlign="center" width="8">
                    Ação
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading && (
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="4" />
                    </Td>
                  </Tr>
                )}
                {data?.users && data.users.length > 0 ? (
                  data?.users.map(item => (
                    <Tr key={item.id}>
                      <Td>{item.id}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      {isWiderVersion && <Td>{item.createdAt}</Td>}
                      <Td textAlign="center">
                        <Flex>
                          <Tooltip
                            hasArrow
                            label="Editar"
                            aria-label="Edit button"
                            bg="pGray.400"
                          >
                            <IconButton
                              mr="2"
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="orange"
                              icon={<Icon as={RiPencilLine} fontSize="16" />}
                              aria-label="Edit button"
                              onClick={
                                () => { }
                                // handleClickEditButton(item, item.id)
                              }
                            >
                              Editar
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            hasArrow
                            label="Excluir"
                            aria-label="Delete button"
                            bg="pGray.400"
                          >
                            <IconButton
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="orange"
                              icon={
                                <Icon as={RiDeleteBin5Line} fontSize="16" />
                              }
                              aria-label="Delete button"
                            >
                              Excluir
                            </IconButton>
                          </Tooltip>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td textAlign="center" colSpan={3}>
                      vazio
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
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
      </Flex>
    </Box>
  );
}
