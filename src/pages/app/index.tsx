import React, { useEffect, useState } from 'react';

import { handleSearchData } from '@/commons/providers/drg.provider';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const searchData = await handleSearchData({
      dataAltaInicial: '2022-08-30',
      dataAltaFinal: '2022-08-30',
      page: 0
    });

    // setData(searchData);
  };

  return (
    <div>
    </div>
  );
}

export default App;