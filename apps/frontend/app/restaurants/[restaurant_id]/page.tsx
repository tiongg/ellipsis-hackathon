'use client';
import RestaurantInfo from './components/RestaurantInfo';
import RestaurantMenu from './components/RestaurantMenu';

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
      },
      {
        id: 102,
        name: 'McNuggets',
        price: 549,
        description:
          'Tender chicken nuggets with a crispy coating, served with your choice of dipping sauce.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off',
      },
      {
        id: 103,
        name: 'Filet-O-Fish',
        price: 719,
        description:
          'A breaded fish filet with tartar sauce and a slice of cheese, served on a steamed bun.',
        imageUrl:
          'https://www.mcdonalds.com.sg/sites/default/files/2023-02/1200x1200_MOP_BBPilot_FOF.png',
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
      },
      {
        id: 202,
        name: 'Quarter Pounder with Cheese',
        price: 819,
        description:
          'A quarter pound beef patty with cheese, onions, pickles, ketchup, and mustard.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202201_0007-005_QuarterPounderwithCheese_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
      },
      {
        id: 203,
        name: 'Cheeseburger',
        price: 579,
        description:
          'A beef patty with cheese, pickles, onions, and ketchup on a hamburger bun.',
        imageUrl:
          'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0003-999_CheeseburgerAlt_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
      },
    ],
  },
];

const info = {
  name: 'McDonalds',
  sla: {
    lastMileTravelString: '15 mins',
  },
  areaName: 'Singapore',
  totalRatingsString: '1,234 ratings',
  avgRatingString: '4.5',
  cuisines: ['Fast Food', 'Burgers'],
};


export default function RestaurantPage({
  params,
}: {
  params: { restaurant_id: string };
}) {
  const { restaurant_id } = params;

  return (
    <div>
      <div className="container mx-auto my-8">
        <RestaurantInfo info={info} />
        <RestaurantMenu menu={menu} />
      </div>
    </div>
  );
}
