/* eslint-disable max-len */
import React from 'react';
import s from './OrderItem.module.scss';
import { ProductModel } from '../../models/ProductModel';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setLocalStorageCart } from '../../features/products/productsSlice';

type Props = {
  item: ProductModel,
};

export const OrderItem: React.FC<Props> = ({ item }) => {
  // const localStorageCart = useAppSelector((state) => state.products.localStorageCart);
  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (product: ProductModel) => {
    if (isUserAuth) {
      // eslint-disable-next-line no-console
      console.log('remove from cart on server');
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') as string);

      const newCart = cart.filter((productItem: ProductModel) => productItem.id !== product.id);

      localStorage.setItem('cart', JSON.stringify(newCart));

      dispatch(setLocalStorageCart(newCart));
    }
  };

  return (
    <div className={s.item}>
      <div className={s.item__information}>
        <div className={s.item__information__left}>
          <div className={s.item__information__left__image} />
          <div className={s.item__information__left__description}>
            <div className={s.item__information__left__description__title}>
              {item.name}
            </div>
            <div className={s.item__information__left__description__price}>
              {`$ ${item.price}`}
            </div>
          </div>
        </div>
        <div className={s.item__information__right}>
          <div className={s.item__information__right__quantity__wrapper}>
            <div className={s.item__information__right__quantity}>
              {item.count}
            </div>
          </div>

          <div className={s.item__information__right__price}>
            {`$ ${(item.price * item.count).toFixed(2)}`}
          </div>
        </div>
      </div>

      <div className={s.functional}>
        <input
          type="text"
          className={s.functional__note}
          placeholder="Order Note..."
        />

        <button
          type="button"
          className={s.functional__delete__wrapper}
          onClick={() => (handleRemoveFromCart(item))}
        >
          <div className={s.functional__delete} />
        </button>
      </div>
    </div>
  );
};
