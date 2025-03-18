import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SkinProps } from '@/types';
import Image from 'next/image';
import React from 'react';

interface Props {
  item: SkinProps;
}

const RouletteItem: React.FC<Props> = ({ item }) => {
  return (
    <Card className="p-0 relative overflow-hidden h-[180px] min-w-[168px]">
      <CardTitle className="p-2 pb-0">
        <Image
          src={item.image}
          alt={`${item.weapon} ${item.name}`}
          width={160}
          height={160}
          quality={100}
          className="relative z-20"
        />
      </CardTitle>
      <CardContent className="p-0 pb-4 flex flex-col items-center relative z-20">
        <h3 className="text-sm font-medium mb-1">{item.name}</h3>
        <p className="text-xs text-secondary-foreground">{item.weapon}</p>
      </CardContent>
    </Card>
  );
};

export default RouletteItem;
