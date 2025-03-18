'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '@/lib/utils';

export async function getSkins() {
  const data = await prisma.skin.findMany();

  return convertToPlainObject(data);
}
