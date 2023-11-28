import axios from '@/services/Axios.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { ApplicationDetailType } from '@/types/ApplicationTypes.ts';

export type handleFetchApplicationDataArgumentsType = {
  method: 'delete' | 'post' | 'put' | 'patch';
  url: string;
  data?: {
    id?: number;
    status?: 'approved' | 'rejected';
    comment?: ApplicationDetailType['comment'];
  };
  toastData: {
    variant: 'default' | 'error' | 'success' | 'warning' | null | undefined;
    title: string;
  };
  status: number;
};

export const handleFetchApplicationsData = ({
  method,
  url,
  data,
  toastData,
  status,
}: handleFetchApplicationDataArgumentsType) => {
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
