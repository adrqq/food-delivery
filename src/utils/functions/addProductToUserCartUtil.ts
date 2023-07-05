import ProductService from '../../api/services/ProductService';
import { addProductToUserCart } from '../../features/products/productsSlice';
import { IUser } from '../../models/IUser';
import { ProductModel } from '../../models/ProductModel';

/* eslint-disable no-console */
export const addProductToUserCartUtil = async (
  dispatch: any,
  user: IUser,
  product: ProductModel,
) => {
  try {
    await ProductService.addProductToUserCart(user.id, product)
      .then(() => {
        dispatch(addProductToUserCart(product));
      });
  } catch (error) {
    console.log(error);
    console.log('error adding product to user cart');
  }
};
