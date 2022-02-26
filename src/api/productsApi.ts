import { IGetProductsResponse } from '../types/products';
import { api } from './instance';

export const productsApi = {
  getProducts: async (page: number) => {
    const response = await api.get<IGetProductsResponse>(
      `menu/10/products/${page}`
    );
    const { pagination, products } = response.data.data;

    return { products, totalCount: pagination.totalCount };
  },
};
