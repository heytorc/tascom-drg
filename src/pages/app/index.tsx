import React from 'react';
import {
  Container,
  Stack,
} from '@chakra-ui/react';

import { useDrg } from '@/commons/contexts/drg.context';

import DrgFilter from '@/components/forms/drg.filter.component';
import TableComponent from '@/components/table/table.component';

const App: React.FC = () => {
  const { data, total } = useDrg()

  return (
    <Container maxWidth={"container.lg"}>
      <Stack mb={5}>
        <DrgFilter />
      </Stack>

      <Stack mb={10}>
        <TableComponent data={data} total={total} />
      </Stack>
    </Container>
  );
}

export default App;