export type GetPaymentInfoDto = {
  //In cents
  amountSubtotal: number;
  amountTotal: number;

  createdTime: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  paymentStatus: string;
  orders: {
    listingId: string;
    listing: {
      product: {
        productId: string;
        productName: string;
        productDescription: string;
        //This one is in dollars
        productPrice: number;
      };
    };
  }[];
};
