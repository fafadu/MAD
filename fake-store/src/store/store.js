// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice'; // 确保导入 userSlice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer, // 确保添加 userReducer
  },
});
