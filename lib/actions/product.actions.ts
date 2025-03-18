'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '@/lib/utils';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';
import { z } from 'zod';
import { insertProductSchema } from '@/lib/validators';

// Create
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  // Create the product using createMany. Since createMany does not return the created records,
  // we fetch the created product by its slug.
  await prisma.product.createMany({
    data: [
      {
        brand: data.brand,
        category: data.category,
        description: data.description,
        images: data.images,
        isFeatured: false,
        name: data.name,
        price: Number(data.price),
        rating: 5,
        slug: data.slug,
        stock: data.stock,
        numReviews: 0,
        banner: null,
      },
    ],
  });

  const createdProduct = await prisma.product.findUnique({
    where: { slug: data.slug },
  });

  // Create many product skins associated with the created product
  await prisma.productSkin.createMany({
    data:
      data.skins?.map((skin) => ({
        productId: createdProduct!.id,
        skinId: skin.skinId,
        dropChance: skin.dropChance,
      })) || [],
  });

  const res = await prisma.product.findUnique({
    where: { slug: data.slug },
    include: { skins: true },
  });

  return convertToPlainObject(res);
}

// Delete
export async function deleteProductById(id: string) {
  const data = await prisma.product.delete({
    where: { id },
  });

  return convertToPlainObject(data);
}

// Get All
export async function getAllProducts() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      skins: {
        include: {
          skin: true,
        },
      },
    },
  });

  return convertToPlainObject(data);
}

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findFirst({
    where: { slug },
    include: {
      skins: {
        include: {
          skin: true,
        },
      },
    },
  });

  return convertToPlainObject(data);
}
