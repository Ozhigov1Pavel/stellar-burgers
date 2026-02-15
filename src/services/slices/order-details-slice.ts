import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type OrderDetailsState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<
  TOrder | null,
  number,
  { rejectValue: string }
>('orderDetails/fetchByNumber', async (number, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(number);
    return data.orders[0] || null;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load order';
    return rejectWithValue(message);
  }
});

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load order';
      });
  }
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
