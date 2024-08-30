'use client';

import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import useSWR from 'swr';

type ListingsListProps = {
  storeId: string;
};

/**
 * Shows all listings
 */
export default function ListingsList({ storeId }: ListingsListProps) {
  const { data: listings, isLoading } = useSWR<GetListingDto>(
    `/api/listing?storeId=${storeId}`
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Current listings:</p>
      {(listings ?? []).map((listing) => (
        <div>
          <img
            src={listing.product.productImageUrl}
            alt={listing.product.productName}
          />
          <p>{listing.product.productName}</p>
        </div>
      ))}
    </div>
  );
}
