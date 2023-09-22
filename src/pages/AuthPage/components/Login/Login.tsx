/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Login.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import closedEyeIcon from '../../../../images/logos/password-eye-closed.svg';
import openEyeIcon from '../../../../images/logos/password-eye-open.svg';
import googleLogo from '../../../../images/logos/google-logo.svg';
import facebookLogo from '../../../../images/logos/facebook-logo.svg';
import plusPeople from '../../../../images/logos/plus-people.svg';
import arrowRight from '../../../../images/logos/arrow-oval-right-white.svg';
import { Stage } from '../../../../types/Products';
import { login } from '../../../../features/users/usersSlice';
import { setLocalStorageCart } from '../../../../features/products/productsSlice';
import { PagePath } from '../../../../types/PagePath';

export const Login: React.FC = () => {
  const [emailLogin, setEmailLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');
  const [isShowLoginPassword, setIsShowLoginPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [role, setRole] = useState('user');

  const isLoginError = useAppSelector((state) => state.users.isLoginError);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleContinueWithoutLogin = () => {
    navigate(PagePath.MENU, { replace: true });
  };

  const handleNavigateRegister = () => {
    navigate(PagePath.REGISTRATION, { replace: true });
  };

  const handleLogin = async () => {
    console.log('handleLogin');
    await dispatch(login({
      emailLogin,
      passwordLogin,
      remember,
    })).then((res) => {
      if (!res.payload) {
        return;
      }

      console.log('res.payload', res.payload);

      if (typeof res.payload === 'string') {
        navigate(PagePath.ACTIVATION, { replace: true });

        return;
      }

      if (res.payload) {
        console.log('res.payload', res.payload);

        if (localStorage.getItem('cart')) {
          localStorage.removeItem('cart');
        }

        dispatch(setLocalStorageCart([]));

        // reload page to update header

        // window.location.reload();

        navigate(PagePath.MENU, { replace: true });
      }
    });
  };

  const handleShowLoginPassword = () => {
    setIsShowLoginPassword(!isShowLoginPassword);
  };

  return (
    <>
      <div className={s.auth__form}>
        <form
          autoComplete="off"
          className={s.auth__form__content}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className={s.auth__form__content__title}>
            Логін
          </div>

          <input
            className={`${s.auth__form__content__input} ${s.auth__form__content__input__email}`}
            type="email"
            placeholder="Електронна пошта"
            onChange={(e) => setEmailLogin(e.target.value)}
            value={emailLogin}
            required
          />

          <div className={s.auth__form__content__input__container}>
            <input
              className={`${s.auth__form__content__input} ${s.auth__form__content__input__password}`}
              type={isShowLoginPassword ? 'text' : 'password'}
              placeholder="Пароль"
              onChange={(e) => setPasswordLogin(e.target.value)}
              value={passwordLogin}
              min={6}
              max={32}
              required
            />

            <button
              className={s.auth__form__content__input__button}
              type="button"
              onClick={handleShowLoginPassword}
            >
              {isShowLoginPassword ? (
                <img alt="eye-open" src={openEyeIcon} />
              ) : (
                <img alt="eye-closed" src={closedEyeIcon} />
              )}
            </button>
          </div>

          {isLoginError && (
            <div className={s.auth__form__content__error}>
              *Неправильно введена пошта чи пароль.
            </div>
          )}

          <div className={s.auth__form__content__options}>
            <div className={s.auth__form__content__options__remember}>
              <input
                className={s.auth__form__content__options__remember__checkbox}
                type="checkbox"
                onChange={() => setRemember(!remember)}
              />

              <div className={s.auth__form__content__options__remember__text}>
                Запам&apos;ятати мене
              </div>
            </div>

            <div className={s.auth__form__content__options__forgot}>
              Забули пароль?
            </div>
          </div>

          <button
            className={s.auth__form__content__button}
            type="submit"
          >
            Логін
          </button>

          <div className={s.auth__form__content__conn_with}>
            <div className={s.auth__form__content__conn_with__line} />

            <div className={s.auth__form__content__conn_with__text}>
              Або увійти за допомогою
            </div>

            <div className={s.auth__form__content__conn_with__line} />
          </div>

          <div className={s.auth__form__content__social}>
            <div className={s.auth__form__content__social__item}>
              <img
                className={s.auth__form__content__social__item__img}
                src={facebookLogo}
                alt="facebook"
              />
            </div>

            <div className={s.auth__form__content__social__item}>
              <img
                className={s.auth__form__content__social__item__img}
                src={googleLogo}
                alt="google"
              />
            </div>
          </div>

          <div className={s.auth__form__continue}>
            <button
              className={s.auth__form__continue__button}
              type="button"
              onClick={handleContinueWithoutLogin}
            >
              <span className={s.auth__form__continue__button__text}>
                Продовжити без входу
              </span>
            </button>
          </div>
        </form>
      </div>

      <div className={s.auth__welcome}>
        <div className={s.auth__welcome__content}>
          <div className={s.auth__welcome__content__logo}>
            <img src={plusPeople} alt="logo" />
          </div>

          <div className={s.auth__welcome__content__title}>
            Вітаємо в Дукаті!
          </div>

          <div className={s.auth__welcome__content__text}>
            Зареєструйтесь прямо зараз щоб отримати доступ до всіх можливостей сайту
          </div>

          <button
            className={s.auth__welcome__content__button}
            type="button"
            onClick={handleNavigateRegister}
          >
            <span
              className={s.auth__welcome__content__button__text}
            >
              Реєстрація
            </span>

            <img alt="arrow" src={arrowRight} className={s.auth__welcome__content__button__arrow} />
          </button>
        </div>
      </div>
    </>
  );
};
