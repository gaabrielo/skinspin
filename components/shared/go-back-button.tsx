'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GoBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className={cn('w-fit', className)}
    >
      <ChevronLeftIcon /> Previous page
    </Button>
  );
};
