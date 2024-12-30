import { FootyladLogo } from '@/components/footylad-logo';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

export function AppTopNav() {
  return (
    <NavigationMenu className='w-svw bg-white max-w-full p-3 h-12 max-h-[4.5rem]'>
      <NavigationMenuList className='flex items-center justify-between'>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <FootyladLogo />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Input
        className='w-56 rounded-full border-none bg-gray-100 ml-2'
        placeholder='Search'
      />
    </NavigationMenu>
  );
}
