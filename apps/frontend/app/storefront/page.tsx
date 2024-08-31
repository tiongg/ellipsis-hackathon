'use client';

import { useState } from 'react';
import { GetStorefrontsDto } from '@shared-types/features/storefront/get-storefronts.dto';
import Link from 'next/link';
import useSWR from 'swr';
import { match } from 'ts-pattern';

import { Button } from '@components/button';
import FullScreenCenter from '../../components/FullScreenCenter';
import DashboardPage from './components/Dashboard';
import StorefrontPage from './components/StorefrontPage';

enum StorefrontTab {
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
}

/**
 * Main dashboard for storefront.
 *
 * Shows stats and stuff
 */
export default function Storefront() {
  const { data, isLoading } = useSWR<GetStorefrontsDto>('/api/storefront');
  const [activeTab, setActiveTab] = useState<StorefrontTab>(
    StorefrontTab.DASHBOARD
  );

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
        <div className="flex justify-between">
          <p className="font-bold text-2xl">Store: {storefront.storeName}</p>
          <Button
            onClick={() =>
              setActiveTab(
                match(activeTab)
                  .with(StorefrontTab.DASHBOARD, () => StorefrontTab.PRODUCTS)
                  .with(StorefrontTab.PRODUCTS, () => StorefrontTab.DASHBOARD)
                  .exhaustive()
              )
            }
          >
            {match(activeTab)
              .with(StorefrontTab.DASHBOARD, () => 'Products')
              .with(StorefrontTab.PRODUCTS, () => 'Dashboard')
              .exhaustive()}
          </Button>
        </div>
        {match(activeTab)
          .with(StorefrontTab.DASHBOARD, () => <DashboardPage />)
          .with(StorefrontTab.PRODUCTS, () => (
            <StorefrontPage storeId={storefront.storeId} />
          ))
          .exhaustive()}
      </div>
    </FullScreenCenter>
  );
}
