'use client';

import { GetProductsDto } from '@shared-types/features/products/get-products.dto';
import useSWR from 'swr';

import { Card } from '@components/card';

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
      <h1>Products</h1>
      <Card>
        <ul>
          {data.map((product) => (
            <li key={product.productId}>
              <p>{product.productName}</p>
              <p>{product.productDescription}</p>
              <p>{product.productPrice}</p>
              <p>{product.productWeight}</p>
              <img src={product.productImageUrl} alt={product.productName} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
