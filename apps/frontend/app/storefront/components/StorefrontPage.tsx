import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import useSWR from 'swr';

import AddProductForm from './AddProductForm';
import OpenShop from './OpenShop';
import ProductList from './ProductList';
import ListingsList from './StoreListingsList';

type StorefrontPageProps = {
  storeId: string;
};

/**
 * Actual storefront content
 *
 * This differs from the 'page' in that it
 * is only for a specific storefront.
 *
 * Different stores might have different store states
 */
export default function StorefrontPage({ storeId }: StorefrontPageProps) {
  // Check if store is open
  // If there are exisiting listings, then store is open
  const { data: listings, isLoading } = useSWR<GetListingDto>(
    `/api/listing?storeId=${storeId}`
  );

  if (isLoading || !listings) {
    return <p>Loading...</p>;
  }

  return listings.length > 0 ? (
    <>
      <p>Store is open</p>
      <ListingsList storeId={storeId} />
    </>
  ) : (
    <>
      <AddProductForm storeId={storeId} />
      <ProductList storeId={storeId} />
      <OpenShop storeId={storeId} />
    </>
  );
}
