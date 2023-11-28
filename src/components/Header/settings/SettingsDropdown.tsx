import { useContext } from 'react';
import { Settings, UserCog } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { AuthContext } from '@/store/AuthStore.tsx';
import { Button } from '@/components/ui/button.tsx';
import UserActions from '@/components/Header/settings/UserActions.tsx';

const SettingsDropdown = () => {
  const auth = useContext(AuthContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          {auth?.isAuth() ? <UserCog /> : <Settings />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          {auth?.isAuth() ? (
            <>
              {auth?.user?.last_name} {auth?.user?.first_name}
            </>
          ) : (
            'Settings'
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <UserActions />

        {auth?.isAuth() && <DropdownMenuSeparator />}

        <DropdownMenuLabel className="text-center text-xs font-normal">
          'Options'
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
