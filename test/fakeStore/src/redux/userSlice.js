// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from './cartSlice'; // 导入 clearCart 动作

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    signOut: (state) => {
      state.user = null;
      console.log("User signed out"); // 调试日志
      clearCart(); // 清空购物车
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser, clearUser, signOut, updateUser } = userSlice.actions;

export default userSlice.reducer;