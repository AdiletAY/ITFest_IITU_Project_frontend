import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LucideLoader } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { ObjectStateSetter } from '@/services/Helpers.tsx';
import axios from '@/services/Axios.tsx';
import { AuthContext } from '@/store/AuthStore.tsx';

export type InputStatesType = {
  showPassword: boolean;
  isLoading: boolean;
  showDialog: boolean;
};

const inputStatesInitialState: InputStatesType = {
  showPassword: false,
  isLoading: false,
  showDialog: false,
};

const SignIn = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { toast } = useToast();
  const [inputStates, setInputStates] = useState(inputStatesInitialState);
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });


  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    ObjectStateSetter(setInputStates, {
      ...inputStates,
      showPassword: !inputStates.showPassword,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    ObjectStateSetter(setInputStates, { ...inputStates, isLoading: true });

    axios
      .post('auth/login/', signInData)
      .then((res) => {
        if (res.status === 200) {
          auth?.signIn(res.data.user, res.data.token);
          toast({
            variant: 'success',
            title: `Welcome, ${res.data.user.last_name} ${res.data.user.first_name}!`,
            description: 'You have successfully logged in',
          });
          navigate('/');
        }
      })
      .catch((err) => {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'Incorrect login or password',
        });

        console.error(err);
      })
      .finally(() => {
        ObjectStateSetter(setInputStates, { ...inputStates, isLoading: false });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[100%] max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid w-full items-center gap-1.5">
              {signInData?.username && (
                <Label htmlFor="login" className="text-xs">
                  login
                </Label>
              )}
              <Input
                required
                id="login"
                placeholder='login'
                value={signInData?.username || ''}
                type="text"
                onChange={(e) =>
                  ObjectStateSetter(setSignInData, {
                    ...signInData,
                    username: e.target.value,
                  })
                }
              />
            </div>

            <div className="relative grid w-full items-center gap-1.5">
              {signInData?.password && (
                <Label htmlFor="password" className="text-xs">
                  password
                </Label>
              )}
              <Input
                required
                className="w-full pe-[50px]"
                id="password"
                placeholder='password'
                value={signInData?.password || ''}
                type={inputStates.showPassword ? 'text' : 'password'}
                onChange={(e) =>
                  ObjectStateSetter(setSignInData, {
                    ...signInData,
                    password: e.target.value,
                  })
                }
              />
              <Button
                type="button"
                className="absolute right-0 bottom-0"
                variant="ghost"
                onClick={(event) => handleShowPassword(event)}
              >
                {inputStates.showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>

            <Button
              type="submit"
              disabled={
                !signInData.username ||
                !signInData.password ||
                inputStates.isLoading
              }
            >
              {inputStates.isLoading && (
                <LucideLoader className="mr-2 h-4 w-4 animate-spin ease-in-out" />
              )}
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
