/* eslint-disable max-len */
import { setLocalStorageCart } from '../../features/products/productsSlice';
import { ProductModel } from '../../models/ProductModel';

export const removeProductFromLocalCartUtil = (
  dispatch: any,
  product: ProductModel,
) => {
  if (localStorage.getItem('cart') === null) {
    // eslint-disable-next-line no-console
    console.log('cart is empty');
  } else {
    const cart = JSON.parse(localStorage.getItem('cart') as string);

    const isProductInCart = cart.find((item: ProductModel) => item.id === product.id);

    if (isProductInCart) {
      const newCart = cart.filter((item: ProductModel) => item.id !== product.id);

      localStorage.setItem('cart', JSON.stringify(newCart));

      dispatch(setLocalStorageCart(newCart));

      // eslint-disable-next-line no-console
      console.log('product removed from cart');
    } else {
      // eslint-disable-next-line no-console
      console.log('product not in cart');
    }
  }
};
