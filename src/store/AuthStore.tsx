import { createContext, ReactNode, useState } from 'react';
import { useToast } from '@/components/ui/use-toast.ts';
import axios from '@/services/Axios.tsx';
import { ApplicantType } from '@/types/ApplicationTypes.ts';

type tokenType = {
  refresh?: string;
  access?: string;
};

type AuthContextType = {
  user: ApplicantType | null;
  isAuth: () => boolean;
  signIn: (user: ApplicantType, token?: tokenType, tokenLife?: string) => void;
  checkMe: () => void;
  signOut: () => void;
  compareRole: (role: ApplicantType['role']) => boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthStore = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<ApplicantType | null>(null);
  const isAuth = (): boolean => {
    return !!user;
  };

  const signIn = (
    user: ApplicantType,
    token?: tokenType,
  ) => {
    setUser(user);

    try {
      localStorage.setItem('token', JSON.stringify(token));
    } catch (err) {
      console.error(err);
    }
  };

  const compareRole = (role: ApplicantType['role']) => {
    return user?.role.toLowerCase() === role.toLowerCase();
  };

  const checkMe = () => {
    if (localStorage.getItem('token')) {
      axios
        .get(`/user/me/`)
        .then((res) => {
          if (res.status === 200) {
            signIn(res.data.user, res.data.token);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const signOut = () => {
    toast({
      variant: 'success',
      title: `See you later ${user?.last_name} ${user?.first_name}`,
      description: 'You have successfully signed out of your account',
    });
    setUser(null);
    localStorage.removeItem('token');
  };

  const data = {
    user,
    isAuth,
    signIn,
    checkMe,
    signOut,
    compareRole,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthStore;
