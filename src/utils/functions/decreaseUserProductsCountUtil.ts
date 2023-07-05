/* eslint-disable max-len */
import ProductService from '../../api/services/ProductService';
import { removeProductFromUserCart } from '../../features/products/productsSlice';
import { IUser } from '../../models/IUser';
import { ProductModel } from '../../models/ProductModel';

/* eslint-disable no-console */
export const decreaseUserProductsCountUtil = async (
  dispatch: any,
  user: IUser,
  product: ProductModel,
) => {
  try {
    await ProductService.removeProductFromUserCart(user.id, product.id)
      .then(() => {
        dispatch(removeProductFromUserCart(product.id));
      });
  } catch (error) {
    console.log(error);
    console.log('error decreasing product count');
  }
};
