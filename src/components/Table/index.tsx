import {
  TableContainer,
  Table as ChakraTable,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Skeleton,
} from "@/lib/chakra-ui";
import React from "react";

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  loadingData: boolean;
};

export function Table<Entry extends { id: string }>({
  columns,
  data = [],
  loadingData = false,
}: TableProps<Entry>) {
  return (
    <TableContainer maxH="container.md" overflowY="auto" overflowX="hidden">
      <ChakraTable>
        <Thead>
          <Tr>
            {columns.map((collumn, index) => {
              return (
                <Th key={`${collumn.title + index}`} textAlign="center">
                  {collumn.title}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {loadingData && (
            <Tr>
              <Td colSpan={columns.length}>
                <Skeleton height="4" />
              </Td>
            </Tr>
          )}
          {data ? (
            data.map((entry, entryIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tr key={entryIndex}>
                {columns.map(({ Cell, field, title }, columnIndex) => (
                  <Td key={`${title + columnIndex}`} textAlign="center">
                    {Cell ? (
                      <Cell entry={entry} />
                    ) : (
                      (entry[field] as React.ReactElement)
                    )}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td textAlign="center" colSpan={5}>
                vazio
              </Td>
            </Tr>
          )}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
