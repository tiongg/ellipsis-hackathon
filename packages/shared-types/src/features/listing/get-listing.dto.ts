export type GetListingDto = DisplayListingDto[];

export type DisplayListingDto = {
  listingId: string;
  productId: string;
  soldAt?: string;
  product: {
    productId: string;
    productName: string;
    productDescription: string;
    productImageUrl: string;
    productCategory: string;
    productPrice: number;
    store: {
      storeId: string;
      storeName: string;
    };
  };
};
