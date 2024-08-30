export type GetProductsDto = ProductDto[];

export type ProductDto = {
  productId: string;
  productDescription: string;
  productName: string;
  productPrice: number;
  productWeight: number;
  productImageUrl: string;
};
