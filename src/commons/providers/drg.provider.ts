import { auth, api } from "@/commons/services/drg";

import { ISearchDataRequest } from "@/commons/interfaces/drg/ISearchDataRequest";
import { ISearchDataResponse } from "@/commons/interfaces/drg/ISearchDataResponse";

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

const handleSearchData = async (params: ISearchDataRequest) => {
  try {
    const token = await generateToken();
  
    const { data } : { data: ISearchDataResponse } = await api.post(
      '/search',
      params,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw { message: error.message }
  }
}

export { handleSearchData }