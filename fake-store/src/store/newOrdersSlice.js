// src/store/newOrdersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const newOrdersSlice = createSlice({
  name: 'newOrders',
  initialState,
  reducers: {
    setNewOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearNewOrders: (state) => {
      state.orders = [];
    },
    addNewOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeNewOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload.id);
    },
  },
});

export const { setNewOrders, clearNewOrders, addNewOrder, removeNewOrder } = newOrdersSlice.actions;

export default newOrdersSlice.reducer;
