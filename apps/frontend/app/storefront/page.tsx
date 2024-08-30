'use client';

import { GetStorefrontsDto } from '@shared-types/features/storefront/get-storefronts.dto';
import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import Link from 'next/link';
import useSWR from 'swr';

import AddProductForm from './components/AddProductForm';
import OpenShop from './components/OpenShop';
import ProductList from './components/ProductList';

/**
 * Main dashboard for storefront.
 *
 * Shows stats and stuff
 */
export default function Storefront() {
  const { data, isLoading } = useSWR<GetStorefrontsDto>('/api/storefront');
  if (isLoading || !data) {
    return <FullScreenCenter>Loading...</FullScreenCenter>;
  }
  if (data.length <= 0) {
    return (
      <FullScreenCenter>
        <p>No storefronts found</p>
        <Link href="/storefront/onboard">Create one here!</Link>
      </FullScreenCenter>
    );
  }

  //TODO: Account for more stores haha
  const storefront = data[0];

  return (
    <FullScreenCenter>
      <div className="flex gap-4 flex-col p-4">
        <p>Store: {storefront.storeName}</p>
        <AddProductForm storeId={storefront.storeId} />
        <ProductList storeId={storefront.storeId} />
        <OpenShop storeId={storefront.storeId} />
      </div>
    </FullScreenCenter>
  );
}
