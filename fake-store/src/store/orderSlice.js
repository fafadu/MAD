// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   orders: [],
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     addOrder: (state, action) => {
//       state.orders.push(action.payload);
//     },
//     updateOrderStatus: (state, action) => {
//       const { orderId, isPaid, isDelivered } = action.payload;
//       const order = state.orders.find(order => order.id === orderId);
//       if (order) {
//         if (isPaid !== undefined) order.isPaid = isPaid;
//         if (isDelivered !== undefined) order.isDelivered = isDelivered;
//       }
//     },
//   },
// });

// export const { addOrder, updateOrderStatus } = orderSlice.actions;
// export default orderSlice.reducer;
