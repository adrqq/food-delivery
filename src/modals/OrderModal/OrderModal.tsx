/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import s from './OrderModal.module.scss';
import { ProductCardCart } from '../../components/ProductCardCart';
import { PagePath } from '../../types/PagePath';
import { useAppSelector } from '../../app/hooks';

type Props = {
  setIsCartModalOpen: (value: boolean) => void;
};

export const OrderModal: React.FC<Props> = ({ setIsCartModalOpen }) => {
  const navigate = useNavigate();

  const handlePageChange = (pageUrl: string) => {
    navigate(pageUrl, { replace: true });
  };

  const localStorageCart = useAppSelector((state) => state.products.localStorageCart);
  const cartTotalPrice = useAppSelector((state) => state.products.cartTotalPrice);
  const userCart = useAppSelector((state) => state.products.userCart);

  return (
    <div
      className={s.cart__container}
      onClick={() => setIsCartModalOpen(false)}
    >
      <div
        className={classNames(
          s.cart,
          [localStorageCart.length < 1 && userCart.length < 1 && s.cart_close],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(localStorageCart.length < 1 && userCart.length < 1) ? (
          <div className={s.cart_close__content}>
            <h1 className={s.cart_close__h1}>
              Ваш кошик порожній
            </h1>

            <p className={s.cart_close__h2}>
              Це потрібно виправити. Переходьте в меню
              <br />
              і вибирайте нашу смачну їжу!
            </p>

            <button
              type="button"
              className={s.cart_close__history}
            >
              історія замовлень
            </button>
          </div>
        ) : (
          <>
            <div className={s.cart__wrapper}>
              <p className={s.cart__title}>
                Ваше замовлення
              </p>

              {(localStorageCart.length > 0) ? (
                localStorageCart.map((product) => (
                  <ProductCardCart
                    key={product.id}
                    product={product}
                  />
                ))
              ) : (
                userCart.map((product) => (
                  <ProductCardCart
                    key={product.id}
                    product={product}
                  />
                ))
              )}
            </div>
            <div className={s.cart__payment}>
              <div className={s.cart__payment__info}>
                <p className={s.cart__payment__info__title}>
                  Сума замовлення:
                </p>

                <div className={s.cart__payment__info__price}>
                  <p className={s.cart__payment__info__price__count}>
                    {cartTotalPrice}
                  </p>

                  <p className={s.cart__payment__info__price__title}>
                    грн
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={s.cart__payment__button}
                onClick={() => {
                  handlePageChange(PagePath.HOME__ORDER_MOBILE);
                }}
              >
                <p className={s.cart__payment__button__title}>
                  Оформити
                </p>
              </button>
            </div>

          </>
        )}
      </div>
    </div>
  );
};
