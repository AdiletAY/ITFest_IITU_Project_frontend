import { useContext } from 'react';
import { AuthContext } from '@/store/AuthStore.tsx';

type emptyListType = {
  isRender: boolean;
  title: string;
  description: string;
};

export function GetMyProfileList() {
  const user = useContext(AuthContext)?.user;

  let count = 0;
  let emptyList: emptyListType[] = [];

  const list = [
    {
      title: "Group",
      isRender: !!user?.group?.name || !!user?.course_number,
      description: `${user?.group?.name} (${user?.course_number} course`,

    }
  ];
  list.forEach(({ isRender }) => {
    if (!isRender) {
      count++;
    }
  });

  if (count === list.length) {
    emptyList = [
      {
        isRender: false,
        title: "Oops",
        description: "No information was found",
      },
    ];
  }
  return { list, emptyList };
}

export type listType = {
  icon: '' | JSX.Element;
  type: 'alert' | 'list';
  title: string;
  description: string;
};
