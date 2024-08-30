export type GetListingDto = DisplayListingDto[];

export type DisplayListingDto = {
  listingId: string;
  productId: string;
  soldAt?: string;
  product: {
    productName: string;
    productImageUrl: string;
    store: {
      storeId: string;
      storeName: string;
    };
  };
};
