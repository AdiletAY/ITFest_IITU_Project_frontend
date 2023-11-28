import { useContext } from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { AuthContext } from '@/store/AuthStore.tsx';
import { appLinks } from '@/services/consts/Links.tsx';

export function HeaderNavigation() {
  const auth = useContext(AuthContext);

  const commonNavigation = [
    {
      title: "Home",
      path: appLinks.main,
      icon: '',
    },
  ];

  const authlessNavigation = [
    ...commonNavigation,
    {
      title: "Sign in",
      path: appLinks.signIn,
      icon: '',
    },
  ];

  const studentNavigation = [
    ...commonNavigation,
    {
      title: "For a students",
      path: [
        {
          title: "My categories",
          description: "Categories I applied",
          path: appLinks.userApplicationList,
          icon: '',
        },
        {
          title: "Timetable",
          description: "Timetable",
          path: appLinks.userTimetable,
          icon: '',
        },
      ],
    }
  ];

  const adminNavigation = [
    ...commonNavigation,
    {
      title: "Admin",
      path: [
        {
          title: "Categories",
          description: "Check out all categories",
          path: appLinks.adminApplicationsList,
          icon: '',
        },
        {
          title: "Document editing",
          description: "List of documents required",
          path: appLinks.djangoAdmin,
          icon: '',
        },
      ],
      icon: '',
    },
  ];

  if (auth?.compareRole("admin")) {
    return adminNavigation;
  }

  if (auth?.compareRole("student")) {
    return studentNavigation;
  }

  return authlessNavigation;
}

export function HeaderSettingsNavigation() {
  const auth = useContext(AuthContext);
  const userSettings = [
    {
      title: "My profile",
      path: '/my-profile',
      icon: <UserCircle className="h-4 w-4" />,
    },
    {
      title: "Log out",
      action: auth?.signOut,
      confirm: true,
      confirmDetails: {
        title: 'Confirmation',
        description: `${auth?.user?.first_name}, Do you really want to log out of the account`,
        actionButtons: {
          acceptTitle: "Confirm",
          declineTitle: "Cancel",
        },
      },
      icon: <LogOut className="h-4 w-4" />,
    },
  ];

  const adminSettings = [...userSettings];

  if (auth?.compareRole("admin")) {
    return adminSettings;
  }

  if (auth?.isAuth()) {
    return userSettings;
  }

  return [];
}
