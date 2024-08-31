export const stores = [
  {
    storeId: '483fd85e-84bd-480e-9297-d7c27b78be9b',
    storeName: 'Chicken Rice Store',
    description: 'The best chicken rice in town',
    postalCode: '188212',
  },
  {
    storeId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    storeName: 'McDonalds',
    description: 'Best food in the area',
    postalCode: '188307',
  },
  {
    storeId: 'af23bd07-228d-420e-b239-b0c662ea582d',
    storeName: 'KFC',
    description: 'Chicken rice without the rice',
    postalCode: '188021',
  },
  {
    storeId: '894093ec-286c-4b25-9e2d-f4d47c04dc07',
    storeName: 'Subway',
    description: 'Sandwiches',
    postalCode: '178902',
  },
];

export const products = [
  //Chicken rice
  {
    belongsToStoreId: '483fd85e-84bd-480e-9297-d7c27b78be9b',
    productName: 'Chicken rice',
    productPrice: 2.99,
    productDescription: 'Chicken rice',
    productImageUrl:
      'https://cdn.kuali.com/wp-content/uploads/2004/08/21143457/hainanese-chicken-rice-830x536.jpg',
    productCategory: 'Rice',
    productWeight: 300,
  },
  //Mcs
  {
    belongsToStoreId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    productName: 'McChicken Sandwich',
    productPrice: 6.99,
    productDescription:
      'A crispy chicken patty topped with lettuce and mayo, served on a soft bun.',
    productImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21tBy1jk1CXAB1DcGLp83T_1Gv3XAjRM4_Q&s',
    productCategory: 'Fast Food',
    productWeight: 500,
  },
  {
    belongsToStoreId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    productName: 'McNuggets',
    productPrice: 5.49,
    productDescription:
      'Tender chicken nuggets with a crispy coating, served with your choice of dipping sauce.',
    productImageUrl:
      'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off',
    productCategory: 'Fast Food',
    productWeight: 300,
  },
  {
    belongsToStoreId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    productName: 'Filet-O-Fish',
    productPrice: 719,
    productDescription:
      'A breaded fish filet with tartar sauce and a slice of cheese, served on a steamed bun.',
    productImageUrl:
      'https://www.mcdonalds.com.sg/sites/default/files/2023-02/1200x1200_MOP_BBPilot_FOF.png',
    productCategory: 'Fast Food',
    productWeight: 500,
  },
  {
    belongsToStoreId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    productName: 'Big Mac',
    productPrice: 7.29,
    productDescription:
      'Two beef patties with special sauce, lettuce, cheese, pickles, and onions on a sesame seed bun.',
    productImageUrl:
      'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0005-999_BigMac_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
    productCategory: 'Burgers',
    productWeight: 700,
  },
  {
    belongsToStoreId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    productName: 'Quarter Pounder with Cheese',
    productPrice: 8.19,
    productDescription:
      'A quarter pound beef patty with cheese, onions, pickles, ketchup, and mustard.',
    productImageUrl:
      'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202201_0007-005_QuarterPounderwithCheese_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
    productCategory: 'Burgers',
    productWeight: 600,
  },
  {
    belongsToStoreId: 'f8b32de3-e25a-40a8-bb9e-52853bf53392',
    productName: 'Cheeseburger',
    productPrice: 5.79,
    productDescription:
      'A beef patty with cheese, pickles, onions, and ketchup on a hamburger bun.',
    productImageUrl:
      'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0003-999_CheeseburgerAlt_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
    productCategory: 'Burgers',
    productWeight: 500,
  },
  //KFC
  {
    belongsToStoreId: 'af23bd07-228d-420e-b239-b0c662ea582d',
    productName: '2 Piece Chicken Meal',
    productPrice: 5.79,
    productDescription:
      '2 pieces of chicken with a side of mashed potatoes and coleslaw.',
    productImageUrl:
      'https://brand-uk.assets.kfc.co.uk/2022-11/MOBORDER_2_PIECE_ORIGINAL_RECIPE_CHICKEN_1200x800.jpg?VersionId=_0_pmfyMzSknJD0DpogBpHsIQu5fFSsu',
    productCategory: 'Chicken',
    productWeight: 600,
  },
  {
    belongsToStoreId: 'af23bd07-228d-420e-b239-b0c662ea582d',
    productName: 'Popcorn Chicken',
    productPrice: 3.79,
    productDescription:
      'Bite-sized pieces of chicken coated in a crispy batter.',
    productImageUrl:
      'https://kfc.fi/wp-content/uploads/2023/09/KFC_popcorn_chicken_L.png',
    productCategory: 'Chicken',
    productWeight: 200,
  },
  {
    belongsToStoreId: 'af23bd07-228d-420e-b239-b0c662ea582d',
    productName: 'Zinger Burger',
    productPrice: 5.79,
    productDescription:
      'A spicy chicken fillet with lettuce and mayo, served on a sesame seed bun.',
    productImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39WyK2qU_1nHhLD-5GeyU7GzmrB4s19gRqg&s',
    productCategory: 'Burgers',
    productWeight: 500,
  },
  //Subway
  {
    belongsToStoreId: '894093ec-286c-4b25-9e2d-f4d47c04dc07',
    productName: 'Subway Melt',
    productPrice: 5.79,
    productDescription:
      'Turkey, ham, bacon, and cheese with your choice of veggies and sauce.',
    productImageUrl:
      'https://subwayisfresh.com.sg/wp-content/uploads/2022/01/subway-melt-PH-594x334-1.jpeg',
    productCategory: 'Sandwiches',
    productWeight: 500,
  },
  {
    belongsToStoreId: '894093ec-286c-4b25-9e2d-f4d47c04dc07',
    productName: 'Veggie Delight',
    productPrice: 5.79,
    productDescription:
      'A vegetarian sandwich with your choice of veggies and sauce.',
    productImageUrl:
      'https://subwayisfresh.com.sg/wp-content/uploads/2022/01/veggie-delite-PH-594x334-1.jpeg',
    productCategory: 'Sandwiches',
    productWeight: 500,
  },
  {
    belongsToStoreId: '894093ec-286c-4b25-9e2d-f4d47c04dc07',
    productName: 'Meatball Marinara',
    productPrice: 5.79,
    productDescription:
      'Meatballs in marinara sauce with your choice of cheese and veggies.',
    productImageUrl:
      'https://subwayisfresh.com.sg/wp-content/uploads/2022/01/meatball-marinara-PH-594x334-1.jpeg',
    productCategory: 'Sandwiches',
    productWeight: 500,
  },
];
