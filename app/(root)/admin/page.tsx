'use client';
import DeleteProductAlert from '@/components/shared/admin/product/delete-product-alert';
import ProductPrice from '@/components/shared/product/product-price';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getAllProducts } from '@/lib/actions/product.actions';
import { Product } from '@/types';
import {
  ExternalLinkIcon,
  HouseIcon,
  PackageIcon,
  PickaxeIcon,
  PlusIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AdminDashPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProductsQuery = async () => {
      const res = await getAllProducts();
      setProducts(
        res.map((product) => ({
          ...product,
          rating: Number(product.rating),
          skins: product.skins?.map((skin) => ({
            ...skin,
            dropChance: Number(skin.dropChance),
          })),
        }))
      );
    };

    getProductsQuery();
  }, []);

  const handleProgressPercentage = (sum: number, value: number) => {
    // 100% = params_sum
    // => x = param_value

    const percentage = (value * 100) / sum;
    return percentage;
  };

  const totalProductsInStock = Number(
    products.reduce((acc, product) => acc + product.stock, 0) || 0
  );

  const handleDeleteProduct = async () => {
    // products.filter((p) => p.id !== productId);
    const res = await getAllProducts();
    setProducts(
      // res.map((product) => ({ ...product, rating: Number(product.rating) }))
      res.map((product) => ({
        ...product,
        rating: Number(product.rating),
        skins: product.skins?.map((skin) => ({
          ...skin,
          dropChance: Number(skin.dropChance),
        })),
      }))
    );
  };

  return (
    <div>
      <header className="w-full grid grid-cols-3">
        <Link href="/">
          <Button variant="ghost" className="w-fit">
            <HouseIcon />
            Back to store
          </Button>
        </Link>

        <h1 className="text-2xl font-bold text-center">Admin dashboard</h1>
      </header>
      <Separator className="mb-10 mt-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col h-full">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Live data</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 w-full space-y-2 ">
              <h1 className="w-full inline-block">
                Total products:
                <strong className="text-2xl pl-8 text-neutral-400">
                  {totalProductsInStock}
                </strong>
              </h1>
              <h1 className="w-full inline-block">
                Total sales:
                <strong className="text-2xl pl-16 text-neutral-400">
                  $1,000
                </strong>
              </h1>
              <h1 className="w-full inline-block">
                Average price:
                <strong className="text-2xl pl-10 text-neutral-400">
                  $7.80
                </strong>
              </h1>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-2 overflow-hidden">
          <CardHeader className="grid grid-cols-2 items-center">
            <CardTitle>Products</CardTitle>
            <Link href={'/admin/create-case'} className="ml-auto">
              <Button size="sm" variant={'outline'}>
                <PlusIcon />
                Add product
              </Button>
            </Link>
          </CardHeader>
          <Separator />
          <CardContent className="pb-0 pt-6 px-0 space-y-6">
            {products
              .sort((a, b) => a.stock - b.stock)
              .map((product) => (
                <div key={product.id}>
                  <div className="flex items-center space-x-6 mb-3 pl-6">
                    <Link
                      href={`/product/${product.slug}`}
                      className="block relative group transition-all"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-contain w-20 h-20 group-hover:opacity-60 transition-all"
                        quality={100}
                      />
                      <ExternalLinkIcon className="absolute transition-all scale-0 group-hover:scale-100 opacity-0 inset-0 m-auto w-6 h-6 text-yellow-400 group-hover:opacity-100" />
                    </Link>

                    <Link
                      href={`/product/${product.slug}`}
                      className="space-y-1 group"
                    >
                      <h2 className="text-md font-medium">{product.name}</h2>
                      <div className="flex gap-3 items-center text-neutral-400 group-hover:text-primary transition-colors">
                        <div className="flex items-center text-xs gap-1.5">
                          <PackageIcon size={14} />
                          <p>{product.stock}</p>
                        </div>
                        <div className="flex items-center text-xs gap-1.5">
                          <PickaxeIcon size={14} />
                          <p>{product.skins?.length}</p>
                        </div>
                      </div>
                    </Link>

                    <ProductPrice
                      value={Number(product.price)}
                      className="self-center"
                    />

                    <DeleteProductAlert
                      productId={product.id}
                      onComplete={handleDeleteProduct}
                    />
                  </div>
                  <Progress
                    value={handleProgressPercentage(
                      totalProductsInStock,
                      Number(product.stock)
                    )}
                    className="h-1.5 rounded-none w-full"
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashPage;
