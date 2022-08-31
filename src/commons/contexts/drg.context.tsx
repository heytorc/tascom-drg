import { createContext, useState, FC, useContext } from "react";

import { ISearchDataRequest } from '@/commons/interfaces/drg/ISearchDataRequest';
import { DataItem } from "@/commons/interfaces/drg/ISearchDataResponse";
import { IFormFilterProps } from "@/commons/interfaces/drg/IFormFilterProps";

import { handleSearchData } from "@/commons/providers/drg.provider";

interface IDrgContext {
  data: DataItem[],
  searchData: (params: IFormFilterProps) => void
}

export const DrgContext = createContext({} as IDrgContext);

export const DrgProvider: FC<any> = ({ children }) => {
  const [data, setData] = useState<DataItem[]>([]);

  const searchData = async (params: IFormFilterProps) => {
    const requestParams: ISearchDataRequest = {
      page: params.page || 0
    };

    debugger;

    let initialDate = params.initialDate.split('/').reverse().join('-');
    let finalDate = params.finalDate.split('/').reverse().join('-');

    debugger;

    switch (params.dateType) {
      case 'Alta':
        requestParams.dataAltaInicial = initialDate;
        requestParams.dataAltaFinal = finalDate;
        break;
      case 'Internação':
        requestParams.dataInternacaoInicial = initialDate;
        requestParams.dataInternacaoFinal = finalDate;
        break;
      case 'Cadastro':
        requestParams.dataCadastroInicial = initialDate;
        requestParams.dataCadastroFinal = finalDate;
        break;
      case 'Cadastro da Alta':
        requestParams.dataCadastroAltaInicial = initialDate;
        requestParams.dataCadastroAltaFinal = finalDate;
        break;
      default:
        break;
    }

    const searchData = await handleSearchData(requestParams);

    setData(searchData.items);
  }

  return (
    <DrgContext.Provider value={{
      data,
      searchData
    }}>
      {children}
    </DrgContext.Provider>
  );
}

export const useDrg = () => useContext(DrgContext);