'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn, getRarityClasses } from '@/lib/utils';
import { ProductSkinProps, SkinProps } from '@/types';
import { EyeOffIcon } from 'lucide-react';

import Image from 'next/image';
import { useState } from 'react';

interface SelectableImageListProps {
  data: SkinProps[];
  value: ProductSkinProps[];
  onChange: (value: ProductSkinProps[]) => void;
}

const SelectableSkinList = ({
  data,
  value,
  onChange,
}: SelectableImageListProps) => {
  const [dropRateList, setDropRateList] = useState<ProductSkinProps[]>([]);
  const [hideItems, setHideItems] = useState(false);

  function handleDropRate(skinId: string, dropRateValue: string): void {
    setDropRateList((prev) => [
      ...prev.filter((item) => item.skinId !== skinId),
      {
        skinId,
        dropChance: Number(dropRateValue),
        productId: '',
      },
    ]);

    if (value?.some((i) => i.skinId === skinId)) {
      const filteredValues = value?.filter((i) => i.skinId !== skinId);
      onChange([
        ...filteredValues,
        {
          skinId,
          dropChance: Number(dropRateValue),
        },
      ]);
    }
  }

  return (
    <div>
      <div
        className={`rounded-lg p-px bg-gradient-to-b from-yellow-400 to-transparent mr-6 mb-6`}
      >
        <Card className="overflow-hidden">
          <CardTitle className="w-full text-lg inline-flex justify-between p-4">
            <span>Drop rate</span>
            <div>
              <span>
                {dropRateList.reduce((acc, product) => {
                  return acc + product.dropChance > 100
                    ? 100
                    : acc + product.dropChance;
                }, 0) || 0}
              </span>
              <span className="text-sm">/100</span>
            </div>
          </CardTitle>

          <Progress
            value={
              dropRateList.reduce((acc, product) => {
                return acc + product.dropChance > 100
                  ? 100
                  : acc + product.dropChance;
              }, 0) || 0
            }
            className="h-3 rounded-none bg-transparent border-t border-t-border"
          />
        </Card>
      </div>
      <div className="space-x-2 flex pr-6 mb-4">
        <Input type="text" placeholder="Search inventory..." />
        <Button
          type="button"
          size="icon"
          variant={hideItems ? 'secondary' : 'outline'}
          onClick={() => setHideItems((prev) => !prev)}
        >
          <EyeOffIcon
            className={cn(
              'text-neutral-400 transition-colors',
              hideItems && 'text-white'
            )}
          />
        </Button>
      </div>
      <div className="grid grid-cols-4 text-sm items-center justify-center py-2 text-gray-50 pr-6">
        <span></span>
        <span className="px-2 w-full text-center">Weapon</span>
        <span className="px-2 w-full text-center">Skin</span>
        <span className="w-full text-center">Drop chance</span>
      </div>
      <Separator className="mb-4" />
      <ul className="space-y-4">
        {data
          .filter((item) =>
            hideItems ? value?.some((i) => i.skinId === item.id) : true
          )
          .map((item) => {
            const isChecked = value?.some((i) => i.skinId === item.id);

            return (
              <li key={item.id}>
                <div className="grid grid-cols-4 text-sm items-center justify-center pr-6">
                  <Label className="relative cursor-pointer">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        return checked
                          ? onChange([
                              ...value,
                              {
                                skinId: item.id,
                                dropChance:
                                  dropRateList.findLast(
                                    (dp) => dp.skinId === item.id
                                  )?.dropChance || 0,
                              },
                            ])
                          : onChange(
                              value?.filter((i) => i.skinId !== item.id)
                            );
                      }}
                      className="absolute bottom-1.5 left-1.5 checked:border-gray-50 border-neutral-400"
                    />
                    <div
                      key={item.id}
                      className={`rounded-lg p-px ${
                        getRarityClasses(item.rarity).gradient
                      }`}
                    >
                      <Card className="p-0">
                        <CardTitle className="py-1 px-2">
                          <Image
                            src={item.image}
                            alt={`${item.weapon} ${item.name}`}
                            width={160}
                            height={160}
                          />
                        </CardTitle>
                      </Card>
                    </div>
                  </Label>

                  <span
                    className={cn(
                      'w-full px-2 text-center text-neutral-400 transition-colors',
                      isChecked && 'text-primary'
                    )}
                  >
                    {item.weapon}
                  </span>

                  <span
                    className={cn(
                      'w-full px-2 text-center text-neutral-400 transition-colors',
                      isChecked && 'text-primary'
                    )}
                  >
                    {item.name}
                  </span>

                  <Input
                    type="number"
                    placeholder="%"
                    disabled={!isChecked}
                    onChange={(el) => handleDropRate(item.id, el.target.value)}
                  />
                </div>
                <Separator
                  className={cn(
                    'mt-3 transition-colors',
                    isChecked && 'bg-neutral-400'
                  )}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SelectableSkinList;
