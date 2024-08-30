'use client';

import {
  DisplayListingDto,
  GetListingDto,
} from '@shared-types/features/listing/get-listing.dto';
import { BuyProductDto } from '@shared-types/features/payment/buy-product.dto';
import { Storefront } from '@shared-types/features/storefront/get-storefronts.dto';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';

import { Button } from '@components/button';
import { Card } from '@components/card';
import FullScreenCenter from '../../../components/FullScreenCenter';

async function buyProduct(buyDto: BuyProductDto) {
  const res = await axios.post(`/api/payment/checkout`, buyDto);
  const checkoutUrl = res.data.url;
  window.location = checkoutUrl;
}

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
  const productId = productListing[0].productId;
  const quantity = productListing.length;

  return (
    <Card className="w-[350px]">
      <img src={product.productImageUrl} alt={product.productName} />
      <p>{product.productName}</p>
      <p>Quantity: {quantity}x</p>
      <Button
        onClick={() => {
          buyProduct({
            [productId]: 1,
          });
        }}
      >
        Buy
      </Button>
    </Card>
  );
}

export default function StorePage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  //TODO: this can be ssr
  const { data: store, isLoading: isLoadingStore } = useSWR<Storefront>(
    `/api/storefront/${storeId}`
  );

  const { data: listings, isLoading: isLoadingListings } =
    useSWR<GetListingDto>(`/api/listing?storeId=${storeId}`);

  if (isLoadingStore || !store || isLoadingListings || !listings) {
    return <p>Loading...</p>;
  }

  //Group products together and count
  //TODO: why is this not done on the be???
  const groupedListings = _.groupBy(listings, (listing) => listing.productId);

  return (
    <FullScreenCenter>
      <h1>{store.storeName}</h1>
      <p>{store.description}</p>
      <p>{store.storeUrl}</p>
      <p>Current listings:</p>
      {
        <div>
          {Object.entries(groupedListings).map(
            ([productId, productListing]) => (
              <IndividualListing
                key={productId}
                productListing={productListing}
              />
            )
          )}
        </div>
      }
    </FullScreenCenter>
  );
}
