'use client';

import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import { Storefront } from '@shared-types/features/storefront/get-storefronts.dto';
import _ from 'lodash';
import useSWR from 'swr';

import RestaurantInfo from './components/RestaurantInfo';
import RestaurantMenu from './components/RestaurantMenu';
import { MenuItem } from './typings/menuType';

export default function RestaurantPage({
  params: { restaurantId },
}: {
  params: { restaurantId: string };
}) {
  const { data: listings, isLoading: isLoadingListings } =
    useSWR<GetListingDto>(`/api/listing?storeId=${restaurantId}`);

  //TODO: this can be ssr
  const { data: store, isLoading: isLoadingStore } = useSWR<Storefront>(
    `/api/storefront/${restaurantId}`
  );

  if (isLoadingListings || !listings || isLoadingStore || !store) {
    return <p>Loading...</p>;
  }

  //Group products together and count
  //TODO: why is this not done on the be???
  const groupedListings = _.groupBy(listings, (listing) => listing.productId);
  const asMenu: Record<string, MenuItem[]> = {};
  for (const [, productListings] of Object.entries(groupedListings)) {
    const product = productListings[0].product;
    if (!asMenu[product.productCategory]) {
      asMenu[product.productCategory] = [];
    }
    asMenu[product.productCategory].push({
      id: product.productId,
      name: product.productName,
      price: product.productPrice,
      description: product.productDescription,
      imageUrl: product.productImageUrl,
      amountLeft: productListings.length,
    });
  }

  return (
    <div>
      <div className="container mx-auto my-8">
        <RestaurantInfo
          info={{
            //Placeholders
            name: store.storeName,
            description: store.description,
            areaName: `Singapore ${store.postalCode}`,
            avgRatingString: '4.5',
            cuisines: ['Fast Food', 'Burgers'],
            sla: { lastMileTravelString: '15 mins' },
            totalRatingsString: '1,234 ratings',
          }}
        />
        <RestaurantMenu
          menu={Object.entries(asMenu).map(([category, products]) => ({
            title: category,
            items: products,
          }))}
        />
      </div>
    </div>
  );
}
