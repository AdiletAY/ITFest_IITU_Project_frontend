type Links = {
  main: string;
  about: string;
  signIn: string;
  myProfile: string;
  createApplication: string;
  adminApplicationsList: string;
  userApplicationList: string;
  userTimetable: string;
  adminApplicationDetail: string;
  userApplicationDetail: string;
  djangoAdmin: string;
};

const BASE_URL = import.meta.env.VITE_MEDIA_URL;

export const appLinks: Links = {
  main: '/',
  about: '/about',
  signIn: '/signin',
  myProfile: '/my-profile',
  createApplication: '/createApplication/',
  userApplicationList: '/my-applications',
  userApplicationDetail: '/my-applications/',
  userTimetable: '/my-timetable',
  adminApplicationsList: '/dashboard/applications',
  adminApplicationDetail: '/dashboard/application/',
  djangoAdmin: `${BASE_URL}/admin/`,
};
