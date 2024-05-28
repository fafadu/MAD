// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import newOrdersReducer from './newOrdersSlice'; 
import paidOrdersReducer from './paidOrdersSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    newOrders: newOrdersReducer, 
    paidOrders: paidOrdersReducer,
  },
});

export default store;
