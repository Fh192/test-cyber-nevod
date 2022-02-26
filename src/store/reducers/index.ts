import { authSlice } from './authSlice';
import { productsSlice } from './productsSlice';

export const rootReducer = {
  [authSlice.name]: authSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
};
