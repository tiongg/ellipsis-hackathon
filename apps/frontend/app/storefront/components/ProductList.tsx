'use client';

import { GetProductsDto } from '@shared-types/features/products/get-products.dto';
import useSWR from 'swr';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/card';

type ProductListProps = { storeId: string };

/**
 * List of all store products.
 */
export default function ProductList({ storeId }: ProductListProps) {
  const { data, isLoading } = useSWR<GetProductsDto>(
    `/api/products/${storeId}`
  );

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Products</h1>
      <div className="flex flex-row gap-2">
        {data.map((product) => (
          <Card key={product.productId} className="w-[250px]">
            <CardHeader>
              <CardTitle>{product.productName}</CardTitle>
              <CardDescription>{product.productDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <img
                src={product.productImageUrl}
                alt={product.productName}
                width={250}
                height={200}
              />
              <div>
                {/* product price is actually not a number :)))*/}
                <p>Price: ${parseInt(`${product.productPrice}`).toFixed(2)}</p>
                <p>Weight: {product.productWeight}g</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
