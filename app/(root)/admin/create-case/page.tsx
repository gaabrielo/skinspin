'use client';

import { GoBackButton } from '@/components/shared/go-back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { insertProductSchema } from '@/lib/validators';
import SelectableImageList from '@/components/shared/admin/selectable-image-list';
import { Button } from '@/components/ui/button';
import { getSkins } from '@/lib/actions/skin.actions';
import SelectableSkinList from '@/components/shared/admin/selectable-skin-list';
import { useEffect, useState } from 'react';
import { SkinProps } from '@/types';
import { createProduct } from '@/lib/actions/product.actions';

const caseCoverImgs = [...Array(6)].map(
  (_, imgNumber) => `/images/cs-cases/case${imgNumber + 1}.png`
);

const CreateCasePage = () => {
  const [skins, setSkins] = useState<SkinProps[]>([]);

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      category: '',
      description: '',
      price: '',
      stock: 0,
      images: ['/images/cs-cases/case1.png'],
      skins: [],

      brand: 'DOrg',
      isFeatured: false,
      banner: null,
    },
  });

  // Submit handler.
  async function onSubmit(values: z.infer<typeof insertProductSchema>) {
    const res = await createProduct(values);
    if (res?.id) {
      window.location.href = '/admin';
    }
  }

  useEffect(() => {
    getSkins().then((data) => {
      setSkins(
        data.map((skin) => ({
          ...skin,
          rarity: skin.rarity as SkinProps['rarity'],
        }))
      );
    });
  }, []);

  return (
    <div className="space-y-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="w-full flex flex-col gap-4 md:grid md:grid-cols-3 items-center">
            <GoBackButton />

            <h1 className="text-2xl font-bold text-center">Create case</h1>

            <Button size="sm" className="w-fit md:ml-auto md:mr-0">
              Submit
            </Button>
          </header>
          <Separator className="mb-10 mt-4" />

          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Case details</CardTitle>
              </CardHeader>
              <Separator />

              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>In stock</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case image</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <SelectableImageList
                        images={caseCoverImgs}
                        value={field.value || []}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skins</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 pr-0">
                <FormField
                  control={form.control}
                  name="skins"
                  render={({ field }) => (
                    <FormItem>
                      <SelectableSkinList
                        data={skins}
                        // @ts-expect-error: Field value type mismatch due to library typing issue
                        value={field.value || []}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCasePage;
