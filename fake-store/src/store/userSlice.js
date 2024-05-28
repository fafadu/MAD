// src/store/userSlice.js
// userSlice.js
import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import { updateUser as updateUserService } from '../services/fetchService';



const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ token, name, password }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserService(token, { name, password });
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userSignedOut: (state) => {
      state.user = null;
      state.token = null;
    },
    userSignedUp: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { userSignedIn, userSignedOut, userSignedUp } = userSlice.actions;
export default userSlice.reducer;
