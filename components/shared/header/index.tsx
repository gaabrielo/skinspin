'use client';
import {
  APP_LOGO_BLACK_SRC,
  APP_LOGO_WHITE_SRC,
  APP_NAME,
} from '@/lib/constants';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === 'dark' ? APP_LOGO_WHITE_SRC : APP_LOGO_BLACK_SRC;

  return (
    <>
      <header
        className={cn(
          'w-full',
          resolvedTheme === 'dark' ? 'bg-[#191b1f]' : 'bg-[#fff]'
        )}
        // className="w-full !bg-tertiary-bg"
      >
        <div className="wrapper flex-between">
          <div className="flex-start">
            <Link href="/" className="flex-start">
              <Image
                src={logoSrc}
                alt={`${APP_NAME} logo`}
                width={128}
                height={0}
                priority={true}
              />
            </Link>
          </div>

          <Menu />
        </div>
      </header>
      <Separator />
    </>
  );
};

export default Header;
