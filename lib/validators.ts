import { formatNumberWithDecimal } from '@/lib/utils';
import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  );

export const insertProductSkinSchema = z.object({
  productId: z.string().optional(),
  skinId: z.string(),
  dropChance: z.instanceof(Decimal).or(z.number().min(1).max(100)),
  skin: z
    .object({
      id: z.string(),
      name: z.string(),
      weapon: z.string(),
      slug: z.string(),
      description: z.string(),
      image: z.string(),
      rarity: z.string(),
      stattrak: z.boolean().optional(),
    })
    .optional()
    .nullable(),
});

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(1, 'Brand must be at least 1 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,

  skins: z.array(insertProductSkinSchema).optional(),
});
