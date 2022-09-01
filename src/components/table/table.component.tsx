import React, { useCallback, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  FormLabel,
  Stack,
  Checkbox,
  HStack,
  Input,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Heading,
  Button
} from '@chakra-ui/react';

import { DataItem } from '@/commons/interfaces/drg/ISearchDataResponse';
import { jsonToTable } from '@/commons/utils/text.utils';
import { generateExcel, normalizeJsonToExcel } from '@/commons/providers/formatter.provider';

interface ITableProps {
  data: DataItem[],
  total: number
}

interface IColumns {
  name: string,
  selected: boolean
}

const TableComponent: React.FC<ITableProps> = ({ data = [], total = 0 }) => {
  const [theaders, setTheaders] = useState<string[]>([]);
  const [patientData, setPatientData] = useState<any[]>([]);
  const [columns, setColumns] = useState<IColumns[]>([]);

  const [searchColumn, setSearchColumn] = useState<string>('');

  let filterColumns: IColumns[] = searchColumn.length > 0
    ? columns.filter(column => column.name.toLowerCase().includes(searchColumn))
    : [];

  useEffect(() => {
    transformData()
  }, [data]);

  const handleSearch = (value: string) => {
    setSearchColumn(value);
  };

  const transformData = useCallback(() => {
    if (data.length > 0) {
      const dataTransformed = jsonToTable(data, { stringifyObjects: true });

      const theadersData: string[] = [...new Set(dataTransformed[0])]
      const tdata: any[] = dataTransformed.slice(1);

      setTheaders(theadersData)
      setPatientData(tdata);
      setColumns(theadersData.map(item => ({ name: item, selected: true })));
    }
  }, [data])

  const handleCheckColumn = (key: number) => {
    const columnsCopy = [...columns];

    columnsCopy[key].selected = !columnsCopy[key].selected;

    setColumns(columnsCopy);
  }

  const handleToggleCheckAllColumns = (type: "check" | "uncheck") => {
    let columnsCopy = [...columns];

    columnsCopy = columnsCopy.map(item => ({ ...item, selected: type === "check" }));

    setColumns(columnsCopy);
  }

  const handleGenerateExcel = async () => {
    if (data.length > 0) {
      const translatedData = normalizeJsonToExcel(data);

      await generateExcel(translatedData);
    }
  }

  return (
    <Stack>

      {total ? <Heading>Encontramos {total} registros</Heading> : (
        <Alert
          status='info'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='100px'
        >
          <AlertIcon boxSize='30px' mr={0} mb={3} />
          <AlertDescription maxWidth='sm'>
            Informe um período para buscar os dados do DRG
          </AlertDescription>
        </Alert>
      )}

      {columns.length > 0 && (
        <Stack>
          <Stack pb={'1rem'}>
            <Text>Para gerar a planilha, você pode customizar quais colunas serão exibidas.</Text>

            <FormLabel>Buscar colunas:</FormLabel>

            <Input
              placeholder='Digite para pesquisar as colunas'
              onChange={({ target }) => handleSearch(target.value)}
              value={searchColumn}
            />

            <HStack justifyContent={'flex-end'}>
              <Button colorScheme={'blue'} variant='link' onClick={() => handleToggleCheckAllColumns('check')}>Selecionar todos</Button>
              <Button colorScheme={'blue'} variant='link' onClick={() => handleToggleCheckAllColumns('uncheck')}>Desmarcar todos</Button>
            </HStack>

            <HStack
              w={'full'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              pt={5}
            >
              {filterColumns.length > 0 ? (
                <>
                  {filterColumns?.map((column, key) => (
                    <Checkbox
                      key={`filter_column_${key}`}
                      isChecked={!!column.selected}
                      onChange={() => handleCheckColumn(key)}
                      minW={300}
                      spacing={'1rem'}
                      style={{ marginInlineStart: 0 }}
                    >
                      {column.name}
                    </Checkbox>
                  ))}
                </>
              ) : (
                <>
                  {columns?.map((column, key) => (
                    <Checkbox
                      key={`filter_column_${key}`}
                      isChecked={!!column.selected}
                      onChange={() => handleCheckColumn(key)}
                      minW={300}
                      spacing={'1rem'}
                      paddingInlineStart={0}
                    >
                      {column.name}
                    </Checkbox>
                  ))}
                </>
              )}
            </HStack>
          </Stack>

          <Stack>
            <Button
              colorScheme="green"
              onClick={handleGenerateExcel}
            >
              Gerar Planilha
            </Button>
          </Stack>
        </Stack>
      )}

      {/* <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              {theaders.map((item, index) => <Th key={`theader_column_${index}`}>{item}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {patientData.slice(0, 10).map((item, key) => (
              <Tr key={`drg_data_${key}`}>
                {item.map((value: any, valueKey: number) => (
                  <Td key={`td_${key}_${valueKey}`}>{`${value ?? ''}`}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              {theaders.map((item, index) => <Th key={`theader_column_${index}`}>{item}</Th>)}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer> */}
    </Stack>
  );
}

export default TableComponent;