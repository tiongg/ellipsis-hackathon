'use client';

import { GetStorefrontsDto } from '@shared-types/features/storefront/get-storefronts.dto';
import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import useSWR from 'swr';

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
    return <FullScreenCenter>No storefronts found</FullScreenCenter>;
  }

  //TODO: Account for more stores haha
  const storefront = data[0];

  return (
    <FullScreenCenter>
      <h1>Store: {storefront.storeName}</h1>
      <p>Stats</p>
    </FullScreenCenter>
  );
}
