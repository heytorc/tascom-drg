import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash'
import {
  FormLabel,
  Stack,
  Checkbox,
  HStack,
  Input,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  Heading,
  Button,
  useDisclosure
} from '@chakra-ui/react';

import { DataItem } from '@/commons/interfaces/drg/ISearchDataResponse';
import { jsonToTable } from '@/commons/utils/text.utils';
import { generateExcel, normalizeJsonToExcel } from '@/commons/providers/formatter.provider';
import useLocalStorage from '@/commons/hooks/useLocalStorage';
import { useDrg } from '@/commons/contexts/drg.context';
import { useAuth } from '@/commons/contexts/auth.context';

interface ITableProps {
  data: DataItem[],
  total: number
}

interface IColumns {
  name: string,
  selected: boolean
}

const TableComponent: React.FC<ITableProps> = ({ data = [], total = 0 }) => {
  const { user } = useAuth();
  const { filter } = useDrg();

  const [theaders, setTheaders] = useState<string[]>([]);
  const [patientData, setPatientData] = useState<any[]>([]);
  const [columns, setColumns] = useState<IColumns[]>([]);
  const [columnsStoraged, setColumnsStoraged] = useLocalStorage<string>(
    "columns",
    window.localStorage.getItem('columns') || ''
  );
  const [sheetIsMaking, setSheetIsMaking] = useState(false);

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

      setColumns(theadersData.map(item => {
        let selected = true;

        if (columnsStoraged.length > 0) {
          const columnsStoragedArray = columnsStoraged.split(",");
          selected = columnsStoragedArray.includes(item)
        }


        return { name: item, selected }
      }));
    }
  }, [data])

  const handleCheckColumn = (key: number) => {
    const columnsCopy = _.cloneDeep(columns);

    columnsCopy[key].selected = !columnsCopy[key].selected;

    const columnsSelecteds = columnsCopy.filter(item => item.selected).map(item => item.name).toString();

    setColumnsStoraged(columnsSelecteds);
    setColumns(columnsCopy);
  }

  const handleToggleCheckAllColumns = (type: "check" | "uncheck") => {
    let columnsCopy = _.cloneDeep(columns);

    columnsCopy = columnsCopy.map(item => ({ ...item, selected: type === "check" }));

    setColumns(columnsCopy);
  }

  const handleGenerateExcel = async () => {
    setSheetIsMaking(true);

    if (data.length > 0) {
      const dataFiltredColumns: DataItem[] = [];
      const columnUnselected: string[] = [];

      columns.forEach((col) => {
        if (!col.selected) columnUnselected.push(col.name);
      });

      const dataCopy = _.cloneDeep(data);

      dataCopy.forEach((item, index) => {
        let key: keyof DataItem;

        for (key in item) {
          if (columnUnselected.includes(key)) delete item[key];
        }

        dataFiltredColumns.push(item);
      });

      if (!filter) return;
      if (!user) return;

      const translatedData = normalizeJsonToExcel(dataFiltredColumns);

      await generateExcel(translatedData, filter, user);
    }

    setSheetIsMaking(false);
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
              isLoading={sheetIsMaking}
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