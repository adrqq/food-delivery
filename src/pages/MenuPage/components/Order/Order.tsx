/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
// import classNames from "classnames";
// eslint-disable-next-line import/no-duplicates
// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { OrderItem } from '../../../../components/OrderItem';
import s from './Order.module.scss';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setOrderMenuOpen, setPaymentStage } from '../../../../features/main/mainSlice';
import { ProductModel } from '../../../../models/ProductModel';

export const Order: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOrderMenuOpen = useAppSelector((state) => state.main.isOrderMenuOpen);
  const localStorageCart = useAppSelector((state) => state.products.localStorageCart);

  const handleOrderMenuClose = () => {
    console.log(isOrderMenuOpen);
    dispatch(setOrderMenuOpen(false));

    console.log(isOrderMenuOpen);
  };

  const handlePaymentOpener = () => {
    document.body.style.position = 'fixed';

    dispatch(setPaymentStage(true));

    dispatch(setOrderMenuOpen(false));
  };

  useEffect(() => {
    console.log(localStorageCart);
  }, []);

  return (
    <>
      {isOrderMenuOpen && (
        <div className={s.container}>
          <div className={s.order}>
            <div className={s.order__header}>
              <div className={s.order__header__banner}>
                <div className={s.order__header__banner__info}>
                  <h1 className={s.order__header__banner__title}>
                    Order
                  </h1>
                  <h1 className={s.order__header__banner__number}>
                    #322
                  </h1>
                </div>

                <div className={s.order__header__banner__close__wrapper}>
                  <button
                    type="button"
                    className={s.order__header__banner__close}
                    onClick={handleOrderMenuClose}
                  >
                    x
                  </button>
                </div>
              </div>

              <div className={s.order__header__type}>
                <button type="button" className={s.order__header__type__button}>Dine in</button>
                <button type="button" className={s.order__header__type__button}>To go</button>
                <button type="button" className={s.order__header__type__button}>Delivery</button>
              </div>

              <div className={s.order__header__description}>
                <div className={s.order__header__description__item}>
                  Item
                </div>

                <div className={s.order__header__description__qty}>
                  Qty
                </div>

                <div className={s.order__header__description__price}>
                  Price
                </div>
              </div>
            </div>

            <div className={s.main__container}>
              <div className={s.order__main}>
                {localStorageCart.length >= 1 ? (
                  localStorageCart.map((item: ProductModel) => (
                    <OrderItem
                      key={item.id}
                      item={item}
                    />
                  ))
                ) : (
                  <div className={s.order__main__empty}>
                    Your order is empty
                  </div>
                )}
              </div>
            </div>

            <div className={s.payment__container}>
              <div className={s.order__payment}>
                <div className={s.order__payment__info}>
                  <div className={s.order__payment__discount}>
                    <div className={s.order__payment__discount__title}>
                      Discount:
                    </div>
                    <div className={s.order__payment__discount__value}>
                      0$
                    </div>
                  </div>

                  <div className={s.order__payment__total__price}>
                    <div className={s.order__payment__total__price__title}>
                      Total price:
                    </div>
                    <div className={s.order__payment__total__price__value}>
                      {`${localStorageCart.reduce((acc: number, item: ProductModel) => acc + item.price * item.count, 0).toFixed(2)}$`}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={s.order__payment__button}
                  onClick={handlePaymentOpener}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
