import { lazy, useContext } from 'react';
import { AuthContext } from '@/store/AuthStore.tsx';
import { appLinks } from '@/services/consts/Links.tsx';

const Home = lazy(() => import('@/pages/Common/Home.tsx')),
  About = lazy(() => import('@/pages/Common/About.tsx')),
  MyProfile = lazy(() => import('@/pages/Authorized/MyProfile.tsx')),
  CreateApplication = lazy(
    () => import('@/pages/Student/CreateApplication/CreateApplication.tsx')
  ),
  AdminApplicationsList = lazy(
    () => import('@/pages/Admin/AdminApplicationsList')
  ),
  ApplicationDetail = lazy(() => import('@/pages/Common/ApplicationDetail')),
  SignIn = lazy(() => import('@/pages/Unauthorized/SignIn')),
  UserApplicationList = lazy(
    () => import('@/pages/Student/UserApplicationList')
  ),
  UserApplicationDetail = lazy(
    () => import('@/pages/Student/UserApplicationDetail')
  ),
  UserTimetable = lazy(
    () => import('@/pages/Student/UserTimetable')
  );

export function Routing() {
  const auth = useContext(AuthContext);

  const commonRoutes = [
    {
      path: '*',
      element: <Home />,
    },
    {
      path: appLinks.main,
      element: <Home />,
    },
    {
      path: appLinks.about,
      element: <About />,
    },
  ];

  const unauthorized = [
    ...commonRoutes,
    {
      path: '*',
      element: <SignIn />,
    },
    {
      path: appLinks.signIn,
      element: <SignIn />,
    },
  ];

  const userRoutes = [
    ...commonRoutes,
    {
      path: appLinks.myProfile,
      element: <MyProfile />,
    },
    {
      path: `${appLinks.createApplication}:categoryNumber`,
      element: <CreateApplication />,
    },
    {
      path: appLinks.userApplicationList,
      element: <UserApplicationList />,
    },
    {
      path: `${appLinks.userApplicationDetail}:id`,
      element: <UserApplicationDetail />,
    },
    {
      path: appLinks.userTimetable,
      element: <UserTimetable />,
    },
  ];

  const adminRoutes = [
    ...userRoutes,
    {
      path: appLinks.adminApplicationsList,
      element: <AdminApplicationsList />,
    },
    {
      path: `${appLinks.adminApplicationDetail}:id`,
      element: <ApplicationDetail />,
    },
  ];

  if (auth?.compareRole('admin')) {
    return adminRoutes;
  }

  if (auth?.compareRole('student')) {
    return userRoutes;
  }

  return unauthorized;
}
