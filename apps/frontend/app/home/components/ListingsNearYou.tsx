import {
  DisplayListingDto,
  GetListingDto,
} from '@shared-types/features/listing/get-listing.dto';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { Card } from '@components/card';

/**
 * Single listing item containing details + quantity
 *
 * Assumes every product in the array is the same!
 */
function IndividualListing({
  productListing,
}: {
  productListing: DisplayListingDto[];
}) {
  const product = productListing[0].product;
  const quantity = productListing.length;
  const router = useRouter();

  return (
    <Card
      className="w-[350px] cursor-pointer"
      onClick={() => {
        router.push(`/store/${product.store.storeId}`);
      }}
    >
      <img src={product.productImageUrl} alt={product.productName} />
      <p>{product.productName}</p>
      <p>Quantity: {quantity}x</p>
      <p>From: {product.store.storeName}</p>
    </Card>
  );
}

export default function ListingsNearYou() {
  const { data: listings, isLoading: isLoadingListings } =
    useSWR<GetListingDto>('/api/listing');

  if (isLoadingListings) {
    return <p>Loading...</p>;
  }

  //Group products together and count
  //TODO: why is this not done on the be???
  const groupedListings = _.groupBy(listings, (listing) => listing.productId);

  return (
    <div>
      <p>Current listings:</p>
      {Object.entries(groupedListings).map(([productId, productListing]) => (
        <IndividualListing key={productId} productListing={productListing} />
      ))}
    </div>
  );
}
