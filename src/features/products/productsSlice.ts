import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

const initialState: Product[] = [];

export const fetchInitialProducts = createAsyncThunk(
  'products/fetchInitialProducts',
  async (): Promise<Product[]> => {
    const response = await fetch('initialProducts.json');
    let data: Product[] = await response.json();
    const randomCount = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    const shuffled = data.sort(() => 0.5 - Math.random());
    data = shuffled.slice(0, randomCount);
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
      const index = state.findIndex(product => product.id === action.payload);
      if (index !== -1) state.splice(index, 1);
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
