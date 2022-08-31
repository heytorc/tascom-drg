import React, { useEffect, useState } from 'react';

import { handleSearchData } from '@/commons/providers/drg.provider';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const searchData = await handleSearchData({});

    setData(searchData);
  };

  return (
    <div>
    </div>
  );
}

export default App;