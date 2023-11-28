import DesktopNavigationMenuAppHeader from '@/components/Header/navigation/DesktopNavigationMenuAppHeader.tsx';
import SettingsDropdown from '@/components/Header/settings/SettingsDropdown.tsx';
import { Link } from 'react-router-dom';
import { appLinks } from '@/services/consts/Links.tsx';
import Logo from "@/components/Logo.tsx";
import MobileNavigationMenuAppHeader from '@/components/Header/navigation/MobileNavigationMenuAppHeader.tsx';

const Header = () => {
  return (
    <header className="p-5 mb-2 border-b sticky top-0 w-[100%] z-40 backdrop-blur bg-background-glass">
      <div className="container flex items-center justify-between w-[100%] max-[370px]:justify-end">
        <Link
          className={`transition-all delay-1000 hover:animate-pulse max-[370px]:hidden`}
          to={appLinks.main}
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden lg:block">
            <DesktopNavigationMenuAppHeader />
          </div>
          <SettingsDropdown />
          <div className="block lg:hidden">
            <MobileNavigationMenuAppHeader />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
