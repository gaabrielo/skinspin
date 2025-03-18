import { z } from 'zod';
import { insertProductSchema } from '@/lib/validators';
import { Decimal } from '@prisma/client/runtime/library';

export type Rarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'mythical'
  | 'legendary'
  | 'ancient'
  | 'immortal';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: number;
  createdAt: Date;
  skins?: ProductSkinProps[];
};

export type SkinProps = {
  id: string;
  name: string;
  weapon: string;
  slug: string;
  description: string;
  image: string;
  rarity: Rarity | string;
  stattrak?: boolean;
};

export type ProductSkinProps = {
  productId?: string;
  skinId: string;
  dropChance: number | Decimal;
  skin?: SkinProps;
};
