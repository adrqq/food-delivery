import { ProductModel } from './ProductModel';

export interface CartItemModel {
  product: ProductModel;
  count: number;
}
