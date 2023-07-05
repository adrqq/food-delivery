/* eslint-disable no-console */
/* eslint-disable max-len */
import ProductService from '../../api/services/ProductService';
import { deleteProductFromUserCart } from '../../features/products/productsSlice';
import { IUser } from '../../models/IUser';
import { ProductModel } from '../../models/ProductModel';

export const removeProductFromUserCartUtil = async (
  dispatch: any,
  user: IUser,
  product: ProductModel,
) => {
  try {
    await ProductService.deleteProductFromUserCart(user.id, product.id)
      .then(() => {
        dispatch(deleteProductFromUserCart(product.id));
      });
  } catch (error) {
    console.log(error);
    console.log('error decreasing product count');
  }
};
