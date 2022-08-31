import { auth, api } from "@/commons/services/drg";

import { IRequestSearchDataParams } from "@/commons/interfaces/drg/IRequestSearchDataParams";

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

const handleSearchData = async (params: IRequestSearchDataParams) => {
  try {
    const token = await generateToken();
  
    const { data } = await api.post('/search', params, { headers: { authorization: `Bearer ${token}` } });

    return data;
  } catch (error: any) {
    console.log(error);
    throw { message: error.message }
  }
}

export { handleSearchData }