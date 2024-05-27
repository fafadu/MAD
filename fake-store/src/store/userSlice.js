// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp,signIn, updateUserProfile  } from '../services/fetchService';

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const signInUser = createAsyncThunk('user/signInUser', async ({ name,email, password }) => {
  const response = await signIn(name,email, password);
  console.log('Thunk response:', response); 
  return response;
  
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ token, name, password }) => {
  const response = await updateUserProfile(token, name, password);
  console.log('Update response:', response);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignedUp(state, action) {
      state.user = action.payload;
    },
    userSignedOut(state) {
      state.token = null;
      state.user = null;
    },
    userSignedIn(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    extraReducers: (builder) => {
      builder
        .addCase(signInUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signInUser.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
          };
          console.log('Redux state after sign in:', state.user); // 添加這一行
        })
        .addCase(signInUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        //這個加了就沒資訊
        .addCase(updateUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = {
            ...state.user,
            name: action.payload.name, 
          };
          console.log('Redux state after update:', state.user);
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
        //
      },
  },
});
// 
export const { userSignedUp, userSignedIn, userSignedOut } = userSlice.actions;

export default userSlice.reducer;
