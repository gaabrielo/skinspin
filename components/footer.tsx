'use client';

import { Button } from '@/components/ui/button';
import {
  APP_LOGO_BLACK_SRC,
  APP_LOGO_WHITE_SRC,
  APP_NAME,
} from '@/lib/constants';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import SteamIcon from '@/public/images/logo-steam.svg';
import GithubIcon from '@/public/images/logo-git.svg';
import { Separator } from '@/components/ui/separator';
import { MoveUpRightIcon, ShieldIcon } from 'lucide-react';

const Footer = () => {
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === 'dark' ? APP_LOGO_WHITE_SRC : APP_LOGO_BLACK_SRC;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t dark:border-transparent py-6">
      <div className="grid grid-cols-1 grid-rows-2 gap-8 wrapper md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 flex flex-col gap-3 items-center md:items-start">
          <Image
            src={logoSrc}
            alt={`${APP_NAME} logo`}
            width={128}
            height={0}
            priority={true}
          />

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="group text-neutral-500 hover:text-primary transition-all"
            >
              <SteamIcon className="!w-6 !h-6 fill-current text-primary" />{' '}
              <Separator
                orientation="vertical"
                className="max-h-4 bg-neutral-500 transition-all group-hover:bg-primary"
              />
              Steam
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="group text-neutral-500 hover:text-primary transition-all"
            >
              <GithubIcon className="w-6 h-6 fill-current text-primary" />{' '}
              <Separator
                orientation="vertical"
                className="max-h-4 bg-neutral-500 transition-all group-hover:bg-primary"
              />
              GitHub
            </Button>
          </div>
        </div>

        <div className="md:-col-end-1 flex flex-col text-right items-end text-sm space-y-1.5">
          <Link
            href={'https://github.com/gaabrielo'}
            target="_blank"
            className="hover:underline w-fit flex items-center gap-2"
          >
            <MoveUpRightIcon className="w-4 h-4 text-neutral-400" />
            About
          </Link>
          <Link
            href={'/admin'}
            className="hover:underline w-fit flex items-center gap-2"
          >
            <ShieldIcon className="w-4 h-4 text-neutral-400" />
            Admin
          </Link>
          <span className="text-neutral-400 text-sm pt-2">
            ©{currentYear} {APP_NAME}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
