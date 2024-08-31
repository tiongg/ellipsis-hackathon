import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },

    setInitalCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const selectItemsInCart = (state: { cart: CartState }) =>
  state.cart.items;

export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  setInitalCart,
} = cartSlice.actions;

export default cartSlice.reducer;
