export type GetStorefrontsDto = Storefront[];

export type Storefront = {
  storeId: string;
  storeName: string;
  description: string;
  storeUrl: string;
  longitude: number;
  latitude: number;
  postalCode: string;
};
