'use client';

import RouletteItem from '@/components/shared/product/roulette-item';
import { Card, CardContent } from '@/components/ui/card';
import useMeasure from 'react-use-measure';
import { motion, useAnimation } from 'motion/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product, SkinProps } from '@/types';
import { VolumeXIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const shuffleArray = (array: SkinProps[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ProductRoulette = ({ product }: { product: Product }) => {
  const [rouletteRef, { width: rouletteWidth }] = useMeasure();

  // const xTranslation = useMotionValue(0);
  const controls = useAnimation();
  const currentPosition = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [disabledSound, setDisabledSound] = useState(false);

  console.log(`isSpinning => ${isSpinning}`);
  // const [result, setResult] = useState<SkinProps | null>(null);
  const [currentWeaponsPassed, setCurrentWeaponsPassed] = useState(0);

  const extendedData = () => {
    if (!product.skins) return [];

    // Isso funciona se todas as skins tenham valores inteiros como porcentagem de dropar => dropRate >= 1
    // @ts-expect-error: Weird shit
    const weightedSkins: SkinProps[] = product.skins
      .flatMap((pSkin) =>
        Array.from({ length: Number(pSkin.dropChance) }, () => pSkin?.skin)
      )
      .filter(Boolean);

    return shuffleArray(weightedSkins);
  };

  const [visibleSkins, setVisibleSkins] = useState<SkinProps[]>(extendedData());
  console.log(`visibleSkins => ${visibleSkins}`);

  const handleSpin = () => {
    setIsSpinning(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia o som

      audioRef.current.volume = 1.0;
      if (disabledSound) {
        audioRef.current.volume = 0;
      }
      audioRef.current
        .play()
        .catch((err) => console.error('Erro ao reproduzir áudio:', err));
    }

    const minPixelsShifted = 5000; // Mínimo de pixels para garantir uma rotação considerável
    const maxPixelsShifted = 7000; // Máximo de pixels para o giro
    const randomDisplacement =
      Math.floor(Math.random() * (maxPixelsShifted - minPixelsShifted)) +
      minPixelsShifted;
    const itemWidth = 168;

    const weaponsPassed = Math.floor(randomDisplacement / itemWidth);
    const updatedWeaponsPassed = currentWeaponsPassed + weaponsPassed;

    // Calcula a nova posição
    const newPosition = currentPosition.current - randomDisplacement;
    currentPosition.current = newPosition;

    if (updatedWeaponsPassed > 0.8 * visibleSkins.length) {
      setVisibleSkins((prev) => {
        // const remainingSkins = prev.slice(-20); // N funciona
        const newSkins = extendedData();
        console.log(`NEW SKINS CARIO => ${newSkins}`);
        return [...prev, ...shuffleArray(newSkins)];

        // // 📌 **Ajusta a posição da roleta para compensar os itens removidos**
        // const shuffledNewSkins = shuffleArray(newSkins);
        // const removedItemsCount = prev.length - remainingSkins.length;
        // currentPosition.current += removedItemsCount * itemWidth;

        // return [...remainingSkins, ...shuffledNewSkins];
      });
    }

    // 🌀 **Agora a roleta continua girando suavemente sem precisar resetar**
    controls.start({
      x: newPosition,
      transition: { duration: 5, ease: [0.2, 0.8, 0.2, 1] },
    });

    setCurrentWeaponsPassed(updatedWeaponsPassed);
    setTimeout(() => {
      const markerPosition = rouletteWidth / 2;
      const finalPosition = Math.abs(newPosition) + markerPosition;
      const itemIndex = Math.floor(
        (finalPosition % (visibleSkins.length * itemWidth)) / itemWidth
      );
      const chosenItem: SkinProps = visibleSkins[itemIndex];

      // setResult(chosenItem);
      setIsSpinning(false);

      alert(`You get a ${chosenItem.weapon} ${chosenItem.name}!`);
    }, 5000);
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src={'/roulette-spin.mp3'} type="audio/mpeg" />
      </audio>

      <div className="relative overflow-clip rounded-lg p-0.5 bg-gradient-to-b from-[#f5c71b] to-border ring-8 ring-border">
        <div className="absolute w-10 h-20 bg-[#f5c71b] left-1/2 bottom-2 transform -translate-x-1/2 opacity-20 rounded-full blur-2xl z-10"></div>
        <div className="absolute w-80 h-10 bg-[#f5c71b] left-1/2 -bottom-5 transform -translate-x-1/2 opacity-10 rounded-full blur-2xl z-10"></div>
        <div className="absolute w-screen h-12 bg-[#f5c71b] left-1/2 -bottom-1/4 transform -translate-x-1/2 opacity-15 rounded-full blur-xl z-10"></div>

        <Card
          className="p-0 border-0 relative overflow-hidden"
          ref={rouletteRef}
        >
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

      <div className="w-full flex justify-center mt-10 relative">
        <Button
          variant="ghost"
          className="bg-[#f5c71b] text-black hover:bg-[#f5c71b] hover:brightness-90 hover:text-black"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : `Spin for $${product.price}`}
        </Button>

        <div className="absolute flex h-full right-0">
          <Button
            type="button"
            size="icon"
            variant={disabledSound ? 'secondary' : 'outline'}
            onClick={() => setDisabledSound((prev) => !prev)}
          >
            <VolumeXIcon
              className={cn(
                'text-neutral-400 transition-colors',
                disabledSound && 'text-white'
              )}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductRoulette;
