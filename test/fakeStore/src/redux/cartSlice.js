// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalOrders: 0,
  newOrdersCount: 0, // New orders count state variable
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= action.payload.price;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.totalQuantity -= 1;
        state.totalPrice -= action.payload.price;
      }
    },
    setCartItems: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = action.payload.items.reduce((total, item) => total + item.quantity * item.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setTotalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
    incrementNewOrdersCount: (state) => {
      state.newOrdersCount += 1;
    },
  },
});

export const { addToCart, removeFromCart, setCartItems, clearCart, setTotalOrders, incrementNewOrdersCount } = cartSlice.actions;

export default cartSlice.reducer;