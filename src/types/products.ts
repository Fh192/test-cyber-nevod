export interface IProduct extends INutritionalValue {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

export interface IProductsState {
  products: IProduct[];
  page: number;
  totalCount: number;
  fetching: boolean;
}

export interface IGetProducts {
  products: IProduct[];
  totalCount: number;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
    pagination: {
      totalCount: number;
    };
  };
}

export interface INutritionalValue {
  weight: number;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}
