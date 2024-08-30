'use client';

import { GetStorefrontsDto } from '@shared-types/features/storefront/get-storefronts.dto';
import Link from 'next/link';
import useSWR from 'swr';

import FullScreenCenter from '../../components/FullScreenCenter';
import StorefrontPage from './components/StorefrontPage';

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
        <StorefrontPage storeId={storefront.storeId} />
      </div>
    </FullScreenCenter>
  );
}
