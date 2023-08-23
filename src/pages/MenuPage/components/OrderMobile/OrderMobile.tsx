/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import s from './OrderMobile.module.scss';
import { ProductCardOrder } from '../../../../components/ProductCardOrder';
import { ProductModel } from '../../../../models/ProductModel';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { calculateCartInfo } from '../../../../features/products/productsSlice';
import { PagePath } from '../../../../types/PagePath';

export const OrderMobile = () => {
  const [isCutlerySelected, setIsCutlerySelected] = useState(false);
  // const countOfProducts = 1;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  const cartTotalPrice = useAppSelector((state) => state.products.cartTotalPrice);
  const userCart = useAppSelector((state) => state.products.userCart);
  const localStorageCart = useAppSelector((state) => state.products.localStorageCart);

  const handlePaymentOpen = () => {
    navigate(PagePath.PAYMENT_MOBILE);
  };

  const handleOrderMobileClose = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   dispatch(calculateCartInfo({ isUserAuth }));
  // });

  const handleCutlerySelect = () => {
    setIsCutlerySelected(!isCutlerySelected);
  };

  const handleAddMoreDishes = () => {
    navigate(PagePath.MENU, { replace: true });
  };

  return (
    <div className={s.order__mobile}>
      <header className={s.order__mobile__header}>
        <button
          type="button"
          className={s.order__mobile__header__back}
          onClick={handleOrderMobileClose}
        >
          <div className={s.order__mobile__header__back__image} />
        </button>

        <div className={s.order__mobile__header__text}>
          <p className={s.order__mobile__header__text__main}>Перевірте замовлення</p>

          <p className={s.order__mobile__header__text__second}> (Доставка)</p>
        </div>

      </header>

      <main className={s.order__mobile__main__container}>
        <div className={s.order__mobile__main}>
          {/* {localStorageCart.map((product) => ( */}
          <div className={s.order__mobile__main__product_card}>
            {isUserAuth ? (
              <>
                {userCart.map((product) => (
                  <ProductCardOrder
                    key={product.id}
                    product={product}
                  />
                ))}
              </>
            ) : (
              <>
                {localStorageCart.map((product) => (
                  <ProductCardOrder
                    key={product.id}
                    product={product}
                  />
                ))}
              </>
            )}
          </div>
          <div className={s.order__mobile__main__price}>
            <div className={s.order__mobile__main__price__text}>
              Всього:
            </div>

            <div className={s.order__mobile__main__price__count}>
              {`${cartTotalPrice.toFixed(2)} UAH`}
            </div>
          </div>

          <div className={s.order__mobile__main__cutler}>
            <div className={s.order__mobile__main__cutler__container}>
              <div className={s.order__mobile__main__cutler__wrapper}>
                <div className={s.order__mobile__main__cutler__logo} />

                <p className={s.order__mobile__main__cutler__text}>
                  Потрібні столові прилади?
                </p>
              </div>

              <p className={s.order__mobile__main__cutler__description}>
                Допоможіть нам запобігти пустій витраті
                {' '}
                <br />
                {' '}
                і замовляйте столові прилади тільки якщо потрібно
              </p>
            </div>

            <button
              type="button"
              className={classNames(
                s.order__mobile__main__cutler__button,
                [isCutlerySelected && s.order__mobile__main__cutler__button__active],
              )}
              onClick={handleCutlerySelect}
            >
              {!isCutlerySelected ? (
                <div
                  className={`
                  ${s.order__mobile__main__cutler__button__logo} 
                  ${s.order__mobile__main__cutler__button__logo__plus}
                `}
                />
              ) : (
                <div
                  className={`
                ${s.order__mobile__main__cutler__button__logo} 
                ${s.order__mobile__main__cutler__button__logo__check}
              `}
                />
              )}
            </button>
          </div>

          <div className={s.order__mobile__main__actions}>
            <button
              className={s.order__mobile__main__actions__button}
              type="button"
              onClick={handleAddMoreDishes}
            >
              <div className={s.order__mobile__main__actions__button__logo} />

              <p className={s.order__mobile__main__actions__button__text}>
                Добавте більше страв
              </p>
            </button>

            <button
              className={s.order__mobile__main__actions__button}
              type="button"
            >
              <div className={s.order__mobile__main__actions__button__logo} />

              <p className={s.order__mobile__main__actions__button__text}>
                Коментар для закладу
              </p>
            </button>
          </div>
        </div>
        <button
          type="button"
          className={s.order__mobile__main__button}
          onClick={handlePaymentOpen}
        >
          <p className={s.order__mobile__main__button__text}>
            Далі
          </p>
        </button>
      </main>
    </div>
  );
};
