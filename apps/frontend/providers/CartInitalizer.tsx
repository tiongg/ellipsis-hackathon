import { PropsWithChildren, useEffect } from 'react';

import { setInitalCart } from '@frontend/utils/cart-slice';
import { useAppDispatch } from '@frontend/utils/redux-selectors';

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return '';
  }
  return localStorage.getItem(key);
};

export default function CartInitalizer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cart = JSON.parse(getFromLocalStorage('cart') || '[]');
    dispatch(setInitalCart(cart));
  }, [dispatch]);

  return children;
}
