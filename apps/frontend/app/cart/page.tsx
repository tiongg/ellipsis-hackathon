"use client"

import { useSelector } from 'react-redux';
import CartItemList from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import { selectItemsInCart } from '../store/features/cartSlice';

export default function Cart() {
  const cartItems = useSelector(selectItemsInCart);

  return (
    <div className='container py-8 pb-16'>
      <h1 className='text-2xl my-4 font-semibold'>Cart</h1>

      <div className='min-h-[60vh] pb-8 md:flex gap-8'>
        {/* cart items */}
        <CartItemList />
        {/* order summary */}
        {cartItems && cartItems.length !== 0 && <OrderSummary />}
      </div>
    </div>
  );
};

