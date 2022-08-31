import React from 'react';
import {
  Container,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

import { useDrg } from '@/commons/contexts/drg.context';

import dayjs from '@/commons/utils/date.utils';

import DrgFilter from '@/components/forms/drg.filter.component';

const App: React.FC = () => {
  const { data } = useDrg()

  return (
    <Container maxWidth={"container.lg"}>
      <Stack>
        <DrgFilter />
      </Stack>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, key) => (
              <Tr key={`drg_${key}`}>
                <Td>{item.numeroAtendimento}</Td>
                <Td>{item.numeroRegistro}</Td>
                <Td>{dayjs(item.dataAlta).format('DD/MM/YYYY HH:mm:ss')}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;