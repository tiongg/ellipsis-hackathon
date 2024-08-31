import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  selectItemsInCart,
} from '@frontend/utils/cart-slice';
import { Button } from '@components/button';

export default function CartItem() {
  const cartItems = useSelector(selectItemsInCart);
  const dispatch = useDispatch();

  const removeItem = (id: string) => dispatch(removeFromCart(id));
  const decreaseQuantity = (id: string) => dispatch(decreaseItemQuantity(id));
  const increaseQuantity = (id: string) => dispatch(increaseItemQuantity(id));

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col grow min-h-[60vh] justify-center items-center">
        <p>Your cart is empty! Go Order Now!</p>
        <Button asChild>
          <Link href="/home">Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <ul className="basis-7/12">
      {cartItems &&
        cartItems.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 justify-between max-w-[600px] my-4"
          >
            <div className="basis-3/12">
              <img
                className="w-full h-full md:h-auto object-cover block rounded-md aspect-square"
                src={item.imageUrl}
                alt=""
              />
            </div>
            <div className="basis-9/12">
              <p className="text-lg font-semibold">{item.name}</p>

              <p className="hidden md:block">
                {item.description?.length > 50
                  ? item.description.slice(0, 50) + '...'
                  : item.description}
              </p>

              <p className="my-2 space-x-1">
                <span className="font-semibold">
                  ${(item?.quantity * item.price).toFixed(2)}
                </span>
                <span className="text-gray-800 font-normal">
                  ({parseInt(`${item.price}`).toFixed(2)} × {item?.quantity})
                </span>
              </p>

              {/* actions */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item?.quantity === 1}
                    className={
                      'bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold w-8 h-8 rounded-md'
                    }
                  >
                    -
                  </button>
                  <p className="font-bold w-8 h-8 flex justify-center items-center">
                    {item?.quantity}
                  </p>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-primary text-white font-bold w-8 h-8 rounded-md"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="border border-primary text-xs font-semibold text-primary p-2 px-4 rounded-md"
                >
                  Remove item
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
