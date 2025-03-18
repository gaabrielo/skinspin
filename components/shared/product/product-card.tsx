import ProductPrice from '@/components/shared/product/product-price';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm flex flex-col justify-between hover:-translate-y-2 transition-all ease-in">
      <CardHeader className="p-0 items-center mb-2">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium my-4">{product.name}</h2>
        </Link>

        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={180}
            width={180}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4 justify-center">
        {product.stock > 0 ? (
          <ProductPrice value={Number(product.price)} />
        ) : (
          <p className="text-destructive">Out of stock</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
