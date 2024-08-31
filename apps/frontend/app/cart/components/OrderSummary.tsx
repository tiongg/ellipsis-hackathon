import { BuyProductDto } from '@shared-types/features/payment/buy-product.dto';
import axios from 'axios';
import { useSelector } from 'react-redux';

import {
  selectItemsInCart,
  selectTotalPrice,
} from '@frontend/utils/cart-slice';

async function checkout(dto: BuyProductDto) {
  const res = await axios.post('/api/payment/checkout', dto);
  window.location = res.data.url;
}

export default function OrderSummary() {
  const cartItems = useSelector(selectItemsInCart);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="basis-5/12 h-fit sticky top-40 p-8 rounded-md border shadow-md my-8 md:m-0">
      <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>

      {/* order details */}
      <div className="py-4 text-lg space-y-4 border-b">
        <div className="flex justify-between items-center font-semibold">
          <p className="font-normal">Total Price ({cartItems.length} items)</p>
          <p>$ {totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="py-4 border-b">
        <div className="md:flex justify-between items-center font-bold text-lg md:text-2xl">
          <h1>Total Amount Order</h1>
          <h1 className="text-black-500">${totalPrice.toFixed(2)}</h1>
        </div>
      </div>

      <button
        className="w-full block mt-4 uppercase font-bold text-lg bg-primary text-white text-center p-4 rounded-md"
        onClick={() => {
          const dto = cartItems.reduce<BuyProductDto>((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
          }, {});
          checkout(dto);
        }}
      >
        Place order
      </button>
    </div>
  );
}
