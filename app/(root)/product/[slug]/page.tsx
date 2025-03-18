import { GoBackButton } from '@/components/shared/go-back-button';
import ProductPrice from '@/components/shared/product/product-price';
import { Badge } from '@/components/ui/badge';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ProductRoulette from '@/components/shared/product/product-roulette';
import CaseContents from '@/components/shared/product/case-contents';
import { ProductSkinProps } from '@/types';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const skins = product.skins.reduce(
    (acc, skn) => acc.concat({ ...skn, dropChance: Number(skn.dropChance) }),
    [] as ProductSkinProps[]
  );

  return (
    <>
      <div className="space-y-10">
        {/* <div>{JSON.stringify(product)}</div> */}
        <header className="w-full flex flex-col gap-4 md:grid md:grid-cols-3 items-center">
          <GoBackButton />

          <div className="flex flex-col items-center gap-3">
            <h1 className="text-2xl font-bold text-center">{product.name}</h1>
            <Badge className="w-fit">
              <ProductPrice value={Number(product.price)} />
            </Badge>
          </div>
        </header>
        <section className="relative pb-10">
          <ProductRoulette product={product} />
        </section>
        <CaseContents data={skins} />
      </div>
    </>
  );
};

export default ProductDetailsPage;
