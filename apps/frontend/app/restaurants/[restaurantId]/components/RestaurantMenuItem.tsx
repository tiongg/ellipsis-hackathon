import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

import { addToCart } from '@frontend/utils/cart-slice';
import { RestaurantMenuItemProps } from '../typings/menuType';

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const RestaurantMenuItem = ({
  menu,
  index,
  activeIndex,
  setActiveIndex,
}: RestaurantMenuItemProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: CartItem) => {
    swal('Success!', 'Added to cart!', 'success');
    dispatch(addToCart(item));
  };

  return (
    <>
      <div
        onClick={() => setActiveIndex(index)}
        className="flex cursor-pointer justify-between items-center p-4 my-2 rounded-md bg-gray-50 select-none"
      >
        <h3 className="text-lg font-semibold">{menu.title}</h3>
        <button>
          {activeIndex === index ? (
            <ChevronUpIcon className="w-6 h-6" />
          ) : (
            <ChevronDownIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {activeIndex === index && (
        <ul className="p-4">
          {menu.items.map((item) => (
            <li
              className="p-2 py-8 flex gap-4 md:gap-8 justify-between items-center border-b"
              key={item.id}
            >
              <div className="basis-8/12 space-y-2">
                <h2 className="text-base font-semibold">{item.name}</h2>
                <p className="text-xs font-semibold">
                  ${parseInt(`${item.price}`).toFixed(2)}
                </p>
                <p className="text-xs hidden md:block">{item.description}</p>
              </div>

              <div className="w-full basis-4/12 relative">
                <img
                  className="w-32 h-full object-cover rounded-md"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-white text-black-500 hover:bg-primary hover:text-white font-bold p-2 px-6 rounded-md absolute shadow-md left-[50%] -bottom-5 -translate-x-[50%]"
                >
                  ADD IT!
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RestaurantMenuItem;
