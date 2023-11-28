import axios from '@/services/Axios.tsx';
import { toast } from '@/components/ui/use-toast.ts';

export type handleFetchCategoriesDataArguments = {
  method: 'delete' | 'post' | 'put' | 'patch';
  url: string;
  data?: {
    id: number;
    title_kk: string;
    title_en: string;
    title_ru: string;
    is_active?: boolean;
  };
  toastData: {
    variant: 'default' | 'error' | 'success' | 'warning' | null | undefined;
    title: string;
  };
  status: number;
};

export const handleFetchCategoriesData = ({
  method,
  url,
  data,
  toastData,
  status,
}: handleFetchCategoriesDataArguments) => {
  const fetch = axios({
    method: method,
    url: url,
    data: data,
  })
    .then((res) => {
      if (res.status === status) {
        toast(toastData);
      }
    })
    .catch((err) => {
      console.error(err);
    });

  return fetch;
};
