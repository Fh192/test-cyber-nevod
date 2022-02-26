import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';
import { productsApi } from '../../api/productsApi';
import { IGetProducts, IProductsState } from '../../types/products';

const initialState: IProductsState = {
  products: [],
  page: 1,
  totalCount: 0,
  fetching: false,
};

export const getProducts = createAsyncThunk<
  IGetProducts,
  void,
  { state: RootState }
>('products/getProducts', async (_, { getState }) => {
  const { page } = getState().products;

  return await productsApi.getProducts(page);
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: b => {
    b.addCase(getProducts.fulfilled, (state, action) => {
      const { products, totalCount } = action.payload;

      state.products.push(...products);
      state.totalCount = totalCount;
      state.fetching = false;
    });

    b.addCase(getProducts.pending, state => {
      state.fetching = true;
    });
  },
});

export const { setPage } = productsSlice.actions;
