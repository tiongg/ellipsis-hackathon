import { useDispatch, useSelector } from 'react-redux';

import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  selectItemsInCart,
} from '../../store/features/cartSlice';

export default function CartItem() {
  const cartItems = useSelector(selectItemsInCart);
  const dispatch = useDispatch();

  const removeItem = (id: number) => dispatch(removeFromCart(id));
  const decreaseQuantity = (id: number) => dispatch(decreaseItemQuantity(id));
  const increaseQuantity = (id: number) => dispatch(increaseItemQuantity(id));

  // console.log('cart: ', cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="flex grow min-h-[60vh] justify-center items-center">
        <p>Your cart is empty! Go Order Now!</p>
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
              <p className="text-lg font-semibold">
                {item.name}
              </p>

              <p className="hidden md:block">
                {item.description?.length > 50
                  ? item.description.slice(0, 50) + '...'
                  : item.description}
              </p>

              <p className="my-2 space-x-1">
                <span className="font-semibold">
                  $
                  {(
                    (
                      item?.quantity * (item.price / 100)
                    ).toFixed(2)
                  )}
                </span>
                <span className="text-gray-800 font-normal">
                  ({item.price / 100} × {item?.quantity})
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
