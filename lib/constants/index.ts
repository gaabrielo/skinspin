export const APP_NAME: string = process.env.NEXT_PUBLIC_APP_NAME || 'SkinSpin';
export const APP_DESCRIPTION: string =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'An online CS skins shop and admin panel built with Next.js.';
export const SERVER_URL: string =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const APP_LOGO_WHITE_SRC: string = '/images/skinspin-white.svg';
export const APP_LOGO_BLACK_SRC: string = '/images/skinspin-black.svg';
export const LATEST_PRODUCTS_LIMIT: number =
  Number(process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT) || 4;
