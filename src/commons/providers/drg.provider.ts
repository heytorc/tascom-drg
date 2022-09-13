import { auth, api } from "@/commons/services/drg";

import { ISearchDataRequest } from "@/commons/interfaces/drg/ISearchDataRequest";
import { DataItem, ISearchDataResponse } from "@/commons/interfaces/drg/ISearchDataResponse";

const generateToken = async () => {
  try {
    const body = {
      userName: import.meta.env.VITE_DRG_API_AUTH_USERNAME,
      password: import.meta.env.VITE_DRG_API_AUTH_PASSWORD,
      origin: "API_DRG"
    };
  
    const { data: token } : { data: string } = await auth.post('/', body);
  
    return token;
  } catch (error: any) {
    console.log(error);
    throw { message: error.message }
  }
};

const handleSearchData = async (params: ISearchDataRequest): Promise<ISearchDataResponse> => {
  let dataItems: DataItem[] = [];

  try {
    const token = await generateToken();
  
    const { data } : { data: ISearchDataResponse } = await api.post(
      '/search',
      params,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dataItems = data.items;

    const pages = Math.ceil(data.total / 100);

    if (pages > 1) {
      for (let page = 2; page <= pages; page++) {
        const { data: { items } } : { data: ISearchDataResponse } = await api.post(
          '/search',
          { ...params, page },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        items.forEach(item => dataItems.push(item));
      }
    }

    return { total: data.total, items: dataItems };
  } catch (error: any) {
    console.log(error);
    throw { message: error.message }
  }
}

export { handleSearchData }