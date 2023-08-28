/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import s from './Registration.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
// import { Example } from '../../../../hooks';
import closedEyeIcon from '../../../../images/logos/password-eye-closed.svg';
import openEyeIcon from '../../../../images/logos/password-eye-open.svg';
import googleLogo from '../../../../images/logos/google-logo.svg';
import facebookLogo from '../../../../images/logos/facebook-logo.svg';
import exitDoor from '../../../../images/logos/exit-door.svg';
import plusPeople from '../../../../images/logos/plus-people.svg';
import arrowRight from '../../../../images/logos/arrow-oval-right-white.svg';
import { Stage } from '../../../../types/products';
import { setLocalStorageCart } from '../../../../features/products/productsSlice';
import { RegistrationErrorType } from '../../../../types/registrationErrorType';
import {
  registration,
  setRegistrationErrorType,
  setIsUsersLoading,
} from '../../../../features/users/usersSlice';
import { PagePath } from '../../../../types/PagePath';

export const Registration: React.FC = () => {
  const [stage, setStage] = useState<Stage>(Stage.LOGIN);
  const [emailRegister, setEmailRegister] = useState<string>('');
  const [passwordRegister, setPasswordRegister] = useState<string>('');
  const [secondPasswordRegister, setSecondPasswordRegister] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isShowRegisterPassword, setIsShowRegisterPassword] = useState<boolean>(false);
  const [isShowLoginPassword, setIsShowLoginPassword] = useState<boolean>(false);
  const [role, setRole] = useState('user');

  const isLoginError = useAppSelector((state) => state.users.isLoginError);
  const registrationErrorType = useAppSelector((state) => state.users.registrationErrorType);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleContinueWithoutLogin = () => {
    navigate(PagePath.MENU, { replace: true });
  };

  const handleRegister = async () => {
    console.log('handleRegister');

    if (passwordRegister.length < 6) {
      dispatch(setRegistrationErrorType(RegistrationErrorType.WRONG_PASS_LENGTH));

      return;
    }

    if (passwordRegister !== secondPasswordRegister) {
      dispatch(setRegistrationErrorType(RegistrationErrorType.PASSWORDS_NOT_MATCH));

      return;
    }

    dispatch(setIsUsersLoading(true));

    await dispatch(
      registration({
        name,
        role,
        emailRegister,
        passwordRegister,
      }),
    )
      .then((res) => {
        if (typeof res.payload !== 'string') {
          dispatch(setRegistrationErrorType(RegistrationErrorType.NULL));
          navigate(PagePath.ACTIVATION, { replace: true });
          dispatch(setIsUsersLoading(false));
        }
      });
  };

  const handleStageChange = (stageValue: Stage) => {
    const container = document.getElementById('container');

    container?.classList.add(s.active);

    setTimeout(() => {
      container?.classList.remove(s.active);
    }, 2000);

    setStage(stageValue);
    console.log('stageValue', stageValue);
  };

  const handleShowRegisterPassword = () => {
    setIsShowRegisterPassword(!isShowRegisterPassword);
  };

  const handleNavigateLogin = () => {
    navigate(PagePath.LOGIN, { replace: true });
  };

  const handleShowLoginPassword = () => {
    setIsShowLoginPassword(!isShowLoginPassword);
  };

  return (
    <>
      <div className={`${s.auth__form} ${s.register__form}`}>
        <form autoComplete="off" className={s.auth__form__content}>
          <div className={s.auth__form__content__title}>
            Реєстрація
          </div>

          <div className={s.auth__form__content__conn_with}>
            <div className={s.auth__form__content__conn_with__line} />

            <div className={s.auth__form__content__conn_with__text}>
              Або
            </div>

            <div className={s.auth__form__content__conn_with__line} />
          </div>

          <div className={`${s.auth__form__content__social} ${s.register__form__content__social}`}>
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

          <input
            className={`${s.auth__form__content__input} ${s.auth__form__content__input__name}`}
            type="text"
            placeholder="Ваше імя або нікнейм"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <input
            className={`${s.auth__form__content__input} ${s.auth__form__content__input__email}`}
            type="email"
            placeholder="Електронна пошта"
            onChange={(e) => setEmailRegister(e.target.value)}
            value={emailRegister}
            required
          />

          <div className={s.auth__form__content__input__container}>
            <input
              className={classNames(
                s.auth__form__content__input,
                s.auth__form__content__input__password,
              )}
              type={isShowRegisterPassword ? 'text' : 'password'}
              placeholder="Ваш пароль"
              onChange={(e) => setPasswordRegister(e.target.value)}
              value={passwordRegister}
              min={6}
              max={32}
              required
            />

            <button
              className={s.auth__form__content__input__button}
              type="button"
              onClick={handleShowRegisterPassword}
            >
              {isShowRegisterPassword ? (
                <img alt="eye-open" src={openEyeIcon} />
              ) : (
                <img alt="eye-closed" src={closedEyeIcon} />
              )}
            </button>
          </div>

          <div className={s.auth__form__content__input__container}>
            <input
              className={classNames(
                s.auth__form__content__input,
                s.auth__form__content__input__password,
              )}
              type={isShowRegisterPassword ? 'text' : 'password'}
              placeholder="Підтвердить пароль"
              onChange={(e) => setSecondPasswordRegister(e.target.value)}
              value={secondPasswordRegister}
              min={6}
              max={32}
              required
            />

            <button
              className={s.auth__form__content__input__button}
              type="button"
              onClick={handleShowRegisterPassword}
            >
              {isShowRegisterPassword ? (
                <img alt="eye-open" src={openEyeIcon} />
              ) : (
                <img alt="eye-closed" src={closedEyeIcon} />
              )}
            </button>
          </div>
          {registrationErrorType === RegistrationErrorType.PASSWORDS_NOT_MATCH && (
            <div className={s.auth__form__content__error}>
              *Паролі не співпадають
            </div>
          )}

          {registrationErrorType === RegistrationErrorType.WRONG_PASS_LENGTH && (
            <div className={s.auth__form__content__error}>
              *Довжина пароля має бути більшою ніж 6 символів
            </div>
          )}

          {registrationErrorType === RegistrationErrorType.EMAIL_ALREADY_EXIST && (
            <div className={s.auth__form__content__error}>
              *Користувач з такою адресою вже існує
            </div>
          )}

          <button
            className={s.auth__form__content__button}
            type="submit"
            onClick={handleRegister}
          >
            Зареєструватися
          </button>

          <div className={s.auth__form__continue}>
            <button
              className={s.auth__form__continue__button}
              type="button"
              onClick={handleContinueWithoutLogin}
            >
              <span className={s.auth__form__continue__button__text}>
                Продовжити без реєстрації
              </span>
            </button>
          </div>
        </form>
      </div>
      <div className={`${s.auth__welcome} ${s.register__welcome}`}>
        <div className={s.auth__welcome__content}>
          <div className={s.auth__welcome__content__logo}>
            <img src={exitDoor} alt="logo" />
          </div>

          <div className={s.auth__welcome__content__title}>
            Вітаємо знову!
          </div>

          <div className={s.auth__welcome__content__text}>
            Щоб залишатися на зв&apos;язку з нами, будь ласка, увійдіть за допомогою особистої інформації
          </div>

          <button
            className={s.auth__welcome__content__button}
            type="button"
            onClick={handleNavigateLogin}
          >
            <img
              alt="arrow"
              src={arrowRight}
              className={`${s.auth__welcome__content__button__arrow} ${s.register__welcome__content__button__arrow}`}
            />

            <span
              className={s.auth__welcome__content__button__text}
            >
              Логін
            </span>
          </button>
        </div>
      </div>

    </>
  );
};
