import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByValue: (state, action) => {
      state.value += action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByValue(amount));
  }, 1000);
};

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
