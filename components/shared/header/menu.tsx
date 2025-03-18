import ModeToggle from '@/components/shared/header/themeModeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SteamSignInButton = () => {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="bg-[#f5c71b] text-black hover:bg-[#f5c71b] hover:brightness-90 hover:text-black"
    >
      <Link href="/sign-in">
        <Image
          src="/images/logo-steam.svg"
          alt="Steam logo"
          width={24}
          height={24}
        />
        Sign in via Steam
      </Link>
    </Button>
  );
};

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1 items-center">
        <ModeToggle />
        <Button asChild variant="ghost" size="sm">
          <Link href="/cart">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Separator orientation="vertical" className="mr-3 max-h-6" />
        <SteamSignInButton />
      </nav>
      <nav className="md:hidden flex gap-3">
        <SteamSignInButton />
        <Sheet>
          <SheetTrigger className="align-middle">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
