import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx';
import { Link } from 'react-router-dom';
import { HeaderNavigation } from '@/services/routing/HeaderNavigation.tsx';
import { appLinks } from '@/services/consts/Links.tsx';

const DesktopNavigationMenuAppHeader = () => {
  return (
    <NavigationMenu delayDuration={2000}>
      <NavigationMenuList>
        {HeaderNavigation().map((navigation, index) => (
          <NavigationMenuItem key={navigation.title + index}>
            {typeof navigation.path === 'string' ? (
              <Link
                className={navigationMenuTriggerStyle()}
                to={navigation.path}
              >
                {navigation.title}
              </Link>
            ) : (
              <>
                <NavigationMenuTrigger>
                  {navigation.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {navigation.path.map((subNavigation) => (
                      <Link
                        to={`${subNavigation.path}`}
                        key={subNavigation.title}
                        target={
                          subNavigation.path === appLinks.djangoAdmin
                            ? '_blank'
                            : '_self'
                        }
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {subNavigation.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {subNavigation.description}
                        </p>
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default DesktopNavigationMenuAppHeader;
