import { setLocalStorageCart } from '../../features/products/productsSlice';
import { ProductModel } from '../../models/ProductModel';

/* eslint-disable max-len */
export const decreaseLocalProductsCountUtil = (
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
      if (isProductInCart.count === 1) {
        const newCart = cart.filter((item: ProductModel) => item.id !== product.id);

        localStorage.setItem('cart', JSON.stringify(newCart));

        dispatch(setLocalStorageCart(newCart));

        // eslint-disable-next-line no-console
        console.log('product removed from cart');

        localStorage.setItem('cart', JSON.stringify(newCart));

        dispatch(setLocalStorageCart(newCart));

        // eslint-disable-next-line no-console
        console.log('product already in cart count decreased by 1');
      } else {
        const newCart = cart.map((item: ProductModel) => {
          if (item.id === product.id) {
            return {
              ...item,
              count: item.count - 1,
            };
          }

          return item;
        });

        localStorage.setItem('cart', JSON.stringify(newCart));

        dispatch(setLocalStorageCart(newCart));

        // eslint-disable-next-line no-console
        console.log('product already in cart count decreased by 1');
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('product not in cart');
    }
  }
};
