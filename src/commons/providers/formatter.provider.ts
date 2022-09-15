import api from "@/commons/services/api";
import { IUser } from "@/commons/contexts/auth.context";
import { IFormFilterProps } from "../interfaces/drg/IFormFilterProps";

import dayjs from '@/commons/utils/date.utils'

interface IGenerateProps extends IFormFilterProps {
  total: number,
  data: any[],
  created_by: number
}



const generateExcel = async (data: any[], filter: IFormFilterProps, user: IUser) => {
  if (!user?.id) return;

  const filename = `exportacao-drg-${dayjs(new Date).unix()}.xlsx`;

  await api.post<any, any, IGenerateProps>('/report/create', {
    ...filter,
    data,
    created_by: user.id,
    total: data.length
  });

  const { data: file } = await api.post('/formatter/export/excel', data, { responseType: 'blob' });

  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename); //or any other extension
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const normalizeJsonToExcel = (data: any[]) => {
  const recursiveSearch = (obj: any[], refKey = '', results: any[] = []) => {
    let r = results

    if (obj) {
      Object.keys(obj).forEach((key: any) => {
        const value: any = obj[key];
        let nKey = refKey !== '' ? `${refKey}.${key}` : key;

        if (typeof value !== 'object') {
          if (r.length > 0) {
            r[0] = { ...r[0], [nKey]: value }
          } else {
            r.push({ [nKey]: value });
          }
        } else if (typeof value === 'object') {
          recursiveSearch(value, nKey, r);
        }
      });
    }

    return r;
  };

  let transformed: any[] = [];

  data.forEach((item, index) => {
    transformed.push(recursiveSearch(item)[0])
  })

  return transformed;
}

export { generateExcel, normalizeJsonToExcel }