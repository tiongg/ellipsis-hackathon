import { useSelector } from 'react-redux';
import {
  selectItemsInCart,
  selectTotalPrice,
} from '../../store/features/cartSlice';

export default function OrderSummary() {
    const cartItems = useSelector(selectItemsInCart);
    const totalPrice = useSelector(selectTotalPrice);
    const deliveryCharges = (totalPrice * 0.05) / 100;
    const totalAmt = totalPrice / 100 + deliveryCharges;
  
    return (
      <div className='basis-5/12 h-fit sticky top-40 p-8 rounded-md border shadow-md my-8 md:m-0'>
        <h2 className='text-xl font-bold border-b pb-4'>Order Summary</h2>
  
        {/* order details */}
        <div className='py-4 text-lg space-y-4 border-b'>
          <div className='flex justify-between items-center font-semibold'>
            <p className='font-normal'>Price ({cartItems.length} items)</p>
            <p>$ {totalPrice / 100}</p>
          </div>
          <div className='flex justify-between items-center font-semibold'>
            <p className='font-normal'>Delivery charges (5%)</p>
            <p>+ ${deliveryCharges.toFixed(2)}</p>
          </div>
        </div>
  
        <div className='py-4 border-b'>
          <div className='md:flex justify-between items-center font-bold text-lg md:text-2xl'>
            <h1>Total Amount Order</h1>
            <h1 className='text-black-500'>
              ${totalAmt.toFixed(2)}
            </h1>
          </div>
        </div>
  
        <button className='w-full block mt-4 uppercase font-bold text-lg bg-primary text-white text-center p-4 rounded-md'>
          Place order
        </button>
      </div>
    );
}
