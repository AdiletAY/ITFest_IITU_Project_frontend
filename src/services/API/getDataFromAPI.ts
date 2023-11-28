import axios from '@/services/Axios.tsx';
import { Dispatch, SetStateAction } from 'react';
import { categoryType } from '@/types/documentType.ts';
import { ApplicationDetailType } from '@/types/ApplicationTypes.ts';

export const getCategories = (
  setApplicationFilesData: Dispatch<SetStateAction<categoryType[] | null>>
) => {
  axios
    .get('/applications/categories/')
    .then((res) => {
      if (res.status === 200) {
        const data: categoryType[] = res.data;

        setApplicationFilesData(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getApplicationDetail = (
  id: number | undefined,
  setCurrentApp: Dispatch<SetStateAction<ApplicationDetailType | null>>
) => {
  axios.get(`applications/detail/${id}/`).then((res) => {
    setCurrentApp((prevState) => ({ ...prevState, ...res.data }));
  });
};
