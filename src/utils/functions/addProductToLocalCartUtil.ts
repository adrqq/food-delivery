/* eslint-disable max-len */
import { setLocalStorageCart } from '../../features/products/productsSlice';
import { ProductModel } from '../../models/ProductModel';

export const addProductToLocalCartUtil = (
  dispatch: any,
  product: ProductModel,
) => {
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([{
      ...product,
      count: 1,
    }]));

    dispatch(setLocalStorageCart([{
      ...product,
      count: 1,
    }]));
  } else {
    const cart = JSON.parse(localStorage.getItem('cart') as string);

    const isProductInCart = cart.find((item: ProductModel) => item.id === product.id);

    if (isProductInCart) {
      const newCart = cart.map((item: ProductModel) => {
        if (item.id === product.id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }

        return item;
      });

      localStorage.setItem('cart', JSON.stringify(newCart));

      dispatch(setLocalStorageCart(newCart));

      // eslint-disable-next-line no-console
      console.log('product already in cart count increased by 1');
    } else {
      cart.push({
        ...product,
        count: product.count + 1,
      });

      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch(setLocalStorageCart(cart));

      // eslint-disable-next-line no-console
      console.log('product added to cart');
    }
  }
};
