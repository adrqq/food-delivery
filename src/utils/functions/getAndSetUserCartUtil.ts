/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ProductService from '../../api/services/ProductService';
import { CartItemModel } from '../../models/CartItemModel';
import { IUser } from '../../models/IUser';
import { ProductModel } from '../../models/ProductModel';

import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  setProductsLength,
  setErrorText,
  setIsProductsLoading,
  setUserCart,
} from '../../features/products/productsSlice';

export const getAndSetUserCartUtil = (
  dispatch: any,
  isUserAuth: boolean,
  user: IUser,
  products: Array<ProductModel>,
): void => {
  try {
    if (isUserAuth) {
      const fetchCart = async () => {
        const res = await ProductService.getProductsFromUserCart(user.id);
        const cartItems: ProductModel[] = [];

        console.log('res cart', res.itemsData);

        res.itemsData.forEach((item: any) => {
          if (item.product) {
            cartItems.push({
              ...item.product,
              count: item.count,
            });
          }
        });

        console.log('cartItems', cartItems);

        dispatch(setUserCart(cartItems));
      };

      fetchCart();
    }
  } catch (error) {
    console.log(error);
  }
};
