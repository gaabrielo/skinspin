'use client';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col w-screen justify-between h-screen">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Card className="p-6 w-1/3 rounded-lg text-center shadow-md">
          <h1 className="text-2xl font-bold mb-2 dark:text-white ">
            Not Found
          </h1>
          <p className="text-destructive">Could not find requested page</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => (window.location.href = '/')}
          >
            Back to Home
          </Button>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
