import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

const initialState: Product[] = [];

export const fetchInitialProducts = createAsyncThunk(
  'products/fetchInitialProducts',
  async () => {
    const response = await fetch('initialProducts.json');
    const data: Product[] = await response.json();
    return data;
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      return state.filter(product => product.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchInitialProducts.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
