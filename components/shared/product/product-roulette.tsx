'use client';

import RouletteItem from '@/components/shared/product/roulette-item';
import { Card, CardContent } from '@/components/ui/card';
import useMeasure from 'react-use-measure';
import { motion, useMotionValue, useAnimation } from 'motion/react';
import { animate } from 'motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product, ProductSkinProps, SkinProps } from '@/types';

const shuffleArray = (array: SkinProps[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ProductRoulette = ({ product }: { product: Product }) => {
  const [ref, { width }] = useMeasure();
  // const xTranslation = useMotionValue(0);
  const controls = useAnimation();
  const currentPosition = useRef(0);

  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<SkinProps | null>(null);
  const [currentWeaponsPassed, setCurrentWeaponsPassed] = useState(0);

  const extendedData = () => {
    if (!product.skins) return [];

    const weightedSkins: SkinProps[] = product.skins
      .flatMap((pSkin) =>
        Array.from({ length: Number(pSkin.dropChance) }, () => pSkin?.skin)
      )
      .filter(Boolean);

    return shuffleArray(weightedSkins);
  };

  const [visibleSkins, setVisibleSkins] = useState<SkinProps[]>(extendedData());
  console.log(`visibleSkins: ${visibleSkins}`);

  const handleSpin = () => {
    setIsSpinning(true);
    const minPixelsShifted = 3000; // Mínimo de pixels para garantir uma rotação considerável
    const maxPixelsShifted = 5000; // Máximo de pixels para o giro
    const randomDisplacement =
      Math.floor(Math.random() * (maxPixelsShifted - minPixelsShifted)) +
      minPixelsShifted;
    const itemWidth = 168;

    const weaponsPassed = Math.floor(randomDisplacement / itemWidth);
    // Calcula a nova posição
    const newPosition = currentPosition.current - randomDisplacement;
    currentPosition.current = newPosition;
    const updatedWeaponsPassed = currentWeaponsPassed + weaponsPassed;

    console.log('NP:', newPosition);
    if (updatedWeaponsPassed > 80) {
      setCurrentWeaponsPassed(0);

      setVisibleSkins((prev) => {
        // const remainingSkins = prev.slice(-20); // Mantém os últimos 20 para evitar um "pulo"
        const newSkins = extendedData();
        return [...prev, ...shuffleArray(newSkins)];

        // const shuffledNewSkins = shuffleArray(newSkins);

        // // 📌 **Ajusta a posição da roleta para compensar os itens removidos**
        // const removedItemsCount = prev.length - remainingSkins.length;
        // currentPosition.current += removedItemsCount * itemWidth;

        // return [...remainingSkins, ...shuffledNewSkins];
      });
    } else {
      setCurrentWeaponsPassed(updatedWeaponsPassed);
    }

    // 🌀 **Agora a roleta continua girando suavemente sem precisar resetar**
    controls.start({
      x: newPosition,
      transition: { duration: 5, ease: [0.2, 0.8, 0.2, 1] },
    });

    setTimeout(() => {
      const markerPosition = width / 2;
      const finalPosition = Math.abs(newPosition) + markerPosition;
      const itemIndex = Math.floor(
        (finalPosition % (visibleSkins.length * itemWidth)) / itemWidth
      );
      const chosenItem: SkinProps = visibleSkins[itemIndex];

      setResult(chosenItem);
      setIsSpinning(false);

      alert(JSON.stringify(chosenItem));
    }, 5000);
  };

  return (
    <>
      <p className="pb-10 text-center">Items passed: {currentWeaponsPassed}</p>
      <div className="relative overflow-clip rounded-lg p-0.5 bg-gradient-to-b from-[#f5c71b] to-border ring-8 ring-border">
        <div className="absolute w-10 h-20 bg-[#f5c71b] left-1/2 bottom-2 transform -translate-x-1/2 opacity-20 rounded-full blur-2xl z-10"></div>
        <div className="absolute w-80 h-10 bg-[#f5c71b] left-1/2 -bottom-5 transform -translate-x-1/2 opacity-10 rounded-full blur-2xl z-10"></div>
        <div className="absolute w-screen h-12 bg-[#f5c71b] left-1/2 -bottom-1/4 transform -translate-x-1/2 opacity-15 rounded-full blur-xl z-10"></div>
        <Card className="p-0 border-0 relative overflow-hidden" ref={ref}>
          <CardContent className="p-0 bg-border">
            <div className="absolute w-[2px] h-full bg-[#f5c71b] top-0 left-1/2 transform -translate-x-1/2 z-30">
              <div className="absolute w-2 h-6 bg-[#f5c71b] left-1/2 -bottom-3 transform -translate-x-1/2 rounded-full"></div>
              <div className="absolute w-2 h-6 bg-[#f5c71b] left-1/2 -top-3 transform -translate-x-1/2 rounded-full"></div>
            </div>

            <motion.div
              // className="absolute left-0 flex gap-[-1px] w-full"
              style={{
                display: 'flex',
                width: `${visibleSkins?.length}px`,
              }}
              animate={controls}
            >
              {visibleSkins?.map((item, index) => (
                <RouletteItem key={`${item.id}-${index}`} item={item} />
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full flex justify-center mt-10">
        <Button
          variant="ghost"
          className="bg-[#f5c71b] text-black hover:bg-[#f5c71b] hover:brightness-90 hover:text-black"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : `Spin for $${product.price}`}
        </Button>
      </div>
    </>
  );
};

export default ProductRoulette;
