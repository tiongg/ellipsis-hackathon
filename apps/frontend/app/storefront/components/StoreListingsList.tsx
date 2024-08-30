'use client';

import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

import { Button } from '@components/button';
import { Card } from '@components/card';

type ListingsListProps = {
  storeId: string;
};

async function removeListing(storeId: string, listingId: string) {
  const res = await axios.delete(`/api/listing/${listingId}`);
  mutate(`/api/listing?storeId=${storeId}`);
  mutate('/api/listing');
  return res.data;
}

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
      <div className="flex gap-2">
        {(listings ?? []).map((listing) => (
          <Card className="w-[350px]">
            <img
              src={listing.product.productImageUrl}
              alt={listing.product.productName}
            />
            <p>{listing.product.productName}</p>
            <Button
              onClick={async () => {
                removeListing(storeId, listing.listingId);
              }}
            >
              Remove listing
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
