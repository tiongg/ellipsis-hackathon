'use client';

import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import { Storefront } from '@shared-types/features/storefront/get-storefronts.dto';
import _ from 'lodash';
import useSWR from 'swr';

import RestaurantInfo from './components/RestaurantInfo';
import RestaurantMenu from './components/RestaurantMenu';
import { MenuItem } from './typings/menuType';

const menu = [
  {
    title: 'Fast Food',
    items: [
      {
        id: 101,
        name: 'McChicken Sandwich',
        price: 699,
        description:
          'A crispy chicken patty topped with lettuce and mayo, served on a soft bun.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21tBy1jk1CXAB1DcGLp83T_1Gv3XAjRM4_Q&s',
        amountLeft: 5,
      },
      {
        id: 102,
        name: 'McNuggets',
        price: 549,
        description:
          'Tender chicken nuggets with a crispy coating, served with your choice of dipping sauce.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off',
        amountLeft: 5,
      },
      {
        id: 103,
        name: 'Filet-O-Fish',
        price: 719,
        description:
          'A breaded fish filet with tartar sauce and a slice of cheese, served on a steamed bun.',
        imageUrl:
          'https://www.mcdonalds.com.sg/sites/default/files/2023-02/1200x1200_MOP_BBPilot_FOF.png',
        amountLeft: 5,
      },
    ],
  },
  {
    title: 'Burgers',
    items: [
      {
        id: 201,
        name: 'Big Mac',
        price: 729,
        description:
          'Two beef patties with special sauce, lettuce, cheese, pickles, and onions on a sesame seed bun.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0005-999_BigMac_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
        amountLeft: 5,
      },
      {
        id: 202,
        name: 'Quarter Pounder with Cheese',
        price: 819,
        description:
          'A quarter pound beef patty with cheese, onions, pickles, ketchup, and mustard.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202201_0007-005_QuarterPounderwithCheese_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
        amountLeft: 5,
      },
      {
        id: 203,
        name: 'Cheeseburger',
        price: 579,
        description:
          'A beef patty with cheese, pickles, onions, and ketchup on a hamburger bun.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0003-999_CheeseburgerAlt_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
        amountLeft: 5,
      },
    ],
  },
];

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
