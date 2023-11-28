import React from 'react';
import { HeaderSettingsNavigation } from '@/services/routing/HeaderNavigation.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu.tsx';
import { Link } from 'react-router-dom';

const UserActions = () => {
  return (
    <DropdownMenuGroup>
      {HeaderSettingsNavigation().map((navigation) => (
        <React.Fragment key={navigation?.title}>
          {!!navigation?.action && !!navigation?.confirm ? (
            <Dialog>
              <DialogTrigger asChild className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-[100%] font-normal text-md px-2"
                >
                  {navigation?.title}
                  <DropdownMenuShortcut>
                    {navigation?.icon}
                  </DropdownMenuShortcut>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{navigation?.confirmDetails?.title}</DialogTitle>
                  <DialogDescription>
                    {navigation?.confirmDetails?.description}
                  </DialogDescription>
                </DialogHeader>
                {!!navigation?.confirmDetails?.actionButtons && (
                  <DialogFooter>
                    {!!navigation?.confirmDetails?.actionButtons
                      ?.declineTitle && (
                      <DialogTrigger asChild>
                        <Button variant="ghost">
                          {
                            navigation?.confirmDetails?.actionButtons
                              ?.declineTitle
                          }
                        </Button>
                      </DialogTrigger>
                    )}
                    {!!navigation?.confirmDetails?.actionButtons
                      ?.acceptTitle && (
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={navigation?.action}>
                          {
                            navigation?.confirmDetails?.actionButtons
                              ?.acceptTitle
                          }
                        </Button>
                      </DialogTrigger>
                    )}
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
          ) : navigation?.action ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={navigation?.action}
            >
              {navigation?.title}
              <DropdownMenuShortcut>{navigation?.icon}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <Link to={navigation?.path || '/'}>
              <DropdownMenuItem className="cursor-pointer">
                {navigation?.title}
                <DropdownMenuShortcut>{navigation?.icon}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
        </React.Fragment>
      ))}
    </DropdownMenuGroup>
  );
};

export default UserActions;
