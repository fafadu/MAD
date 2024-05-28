// src/store/paidOrdersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const paidOrdersSlice = createSlice({
  name: 'paidOrders',
  initialState,
  reducers: {
    setPaidOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearPaidOrders: (state) => {
      state.orders = [];
    },
    addPaidOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    addMultiplePaidOrders: (state, action) => {
      state.orders = state.orders.concat(action.payload);
    }
  },
});

export const { setPaidOrders, clearPaidOrders, addPaidOrder, addMultiplePaidOrders } = paidOrdersSlice.actions;

export default paidOrdersSlice.reducer;
