import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getRarityClasses } from '@/lib/utils';
import { ProductSkinProps, Rarity } from '@/types';
import { EllipsisIcon } from 'lucide-react';
import Image from 'next/image';

const CaseContents = ({ data }: { data: ProductSkinProps[] }) => {
  return (
    <div className="my-10">
      <h1 className="text-xl font-bold text-center mb-10">Case contents</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data
            .sort((a, b) => Number(a.dropChance) - Number(b.dropChance))
            .map(({ skinId, dropChance, skin }) => (
              <div
                key={skinId}
                className={`rounded-lg p-px ${
                  getRarityClasses(skin?.rarity as Rarity).gradient
                }`}
              >
                <Card className="p-3 h-full">
                  <CardTitle className="p-0 flex flex-col items-center">
                    <div className="flex w-full items-center justify-between text-xs text-secondary-foreground mb-1 font-bold">
                      <span className="text-neutral-500 hover:text-gray-50 transition-colors">
                        {Number(dropChance)}%
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-fit w-fit p-1 text-neutral-500"
                      >
                        <EllipsisIcon />
                      </Button>
                    </div>

                    {skin?.image && (
                      <Image
                        src={skin?.image}
                        alt={`${skin?.weapon} ${skin?.name}`}
                        width={160}
                        height={160}
                      />
                    )}
                  </CardTitle>
                  <CardContent className="p-0 flex justify-center text-xs gap-1">
                    <span>{skin?.weapon}</span>
                    <span className="text-neutral-500">|</span>
                    <span>{skin?.name}</span>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default CaseContents;
