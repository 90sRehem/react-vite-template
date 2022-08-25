import { Flex, Heading, Spinner, Box } from "@/lib/chakra-ui";
import { useState } from "react";
import { IUser } from "@/types";
import { useUsers } from "../api";
import { UsersTable } from "./UsersTable";

export function UsersList() {
  const [page, setPage] = useState(1);
  const registersPerPage = 10;
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
          <UsersTable
            data={data?.users as IUser[]}
            currentPage={page}
            loadingData={isLoading}
            onPageChange={setPage}
            registersPerPage={registersPerPage}
            totalCountOfRegisters={data?.totalCount as number}
          />
        </Box>
      </Flex>
    </Box>
  );
}
