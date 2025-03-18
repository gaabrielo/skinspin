import { Rarity } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

export function getRarityColor(rarity: Rarity): string {
  switch (rarity) {
    case 'common':
      return 'neutral-400';
    case 'uncommon':
      return 'blue-400';
    case 'rare':
      return 'indigo-500';
    case 'mythical':
      return 'violet-600';
    case 'legendary':
      return 'fuchsia-600';
    case 'ancient':
      return 'red-500';
    case 'immortal':
      return 'yellow-600';
    default:
      return 'neutral-400';
  }
}

export function getRarityClasses(rarity: Rarity) {
  const colors = {
    common: 'neutral-400',
    uncommon: 'blue-400',
    rare: 'indigo-500',
    mythical: 'violet-600',
    legendary: 'fuchsia-600',
    ancient: 'red-500',
    immortal: 'yellow-600',
  };

  const color = colors[rarity] || 'neutral-400';

  return {
    text: `text-${color}`,
    bg: `bg-${color}`,
    border: `border-${color}`,
    gradient: `bg-gradient-to-b from-transparent to-${color}`,
  };
}
