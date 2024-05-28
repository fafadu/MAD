//cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalItems += 1;
      state.totalPrice += item.price;
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(cartItem => cartItem.id !== item.id);
        }
      }
      state.totalItems -= 1;
      state.totalPrice -= item.price;
    },
    clearCart: state => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    setCart: (state, action) => {
      state.items = action.payload;
      state.totalItems = action.payload.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;

const selectCartItems = state => state.cart.items;
const selectTotalItems = state => state.cart.totalItems;
const selectTotalPrice = state => state.cart.totalPrice;

export const selectCart = createSelector(
  [selectCartItems, selectTotalItems, selectTotalPrice],
  (items, totalItems, totalPrice) => ({ items, totalItems, totalPrice })
);

export default cartSlice.reducer;

