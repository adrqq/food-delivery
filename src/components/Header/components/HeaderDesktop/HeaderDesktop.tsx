/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import s from './HeaderDesktop.module.scss';
import cartIcon from '../../icons/cart-icon2.svg';
import menuBurger from '../../icons/menu-burger.svg';
import facebookIcon from '../../icons/facebook-logo.svg';
import googleIcon from '../../icons/google-icon.svg';
import kyivStarIcon from '../../icons/kyivstar-icon.svg';
import lifeCell from '../../icons/lifecell-icon.svg';
import closeBurger from '../../../../images/logos/close-black.svg';

import likeIconYellow from '../../../../images/logos/heart-yellow-icon.svg';
import historyYellow from '../../../../images/logos/history-icon-yellow.svg';
import mapPoint from '../../../../images/logos/map-point.svg';
import exitLogo from '../../../../images/logos/exit-black.svg';

import { PagePath } from '../../../../types/PagePath';

import { Example } from '../../../../hooks';
import { OrderModal } from '../../../../modals/OrderModal';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setIsLogOutModalOpen,
  setIsBurgerMenuOpen,
} from '../../../../features/main/mainSlice';
import { BurgerMenu } from '../../../BurgerMenu';

export const HeaderDesktop: React.FC = () => {
  const {
    onDesktop, onBigDesktop, is576, is467,
  } = Example();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const brandName = useAppSelector((state) => state.main.brandName);
  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  const isBurgerMenuOpen = useAppSelector((state) => state.main.isBurgerMenuOpen);

  const cartItemsCount = useAppSelector((state) => state.products.cartItemsCount);

  const handleBurgerMenuOpen = () => {
    dispatch(setIsBurgerMenuOpen(true));
  };

  const handleLikePageOpen = () => {
    console.log('like page open');
  };

  const handlePageChange = (pageUrl: string) => {
    navigate(pageUrl, { replace: true });
  };

  const handleRegisterOpen = () => {
    navigate(PagePath.REGISTRATION);
  };

  const handleLoginOpen = () => {
    navigate(PagePath.LOGIN);
  };

  const handleCartModalOpener = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleRegistrationModalClose = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleRegistrationModalOpener = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleLikeModalOpener = () => {
    setIsLikeModalOpen(true);
  };

  const handlePhoneModalClose = () => {
    setIsPhoneModalOpen(false);
  };

  const handlePhoneModalOpener = () => {
    setIsPhoneModalOpen(true);
  };

  const handleLikeModalClose = () => {
    setIsLikeModalOpen(false);
  };

  const handleLogOut = () => {
    console.log('log out');
    dispatch(setIsLogOutModalOpen(true));
  };

  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.style.position = 'fixed';
    }

    return () => {
      document.body.style.position = 'unset';
    };
  }, [isBurgerMenuOpen]);

  return (
    <header
      className={s.header__desktop}
      onMouseLeave={() => {
        handlePhoneModalClose();
        handleLikeModalClose();
        handleRegistrationModalClose();
      }}
    >
      <div className={s.header__desktop__wrapper}>
        <button
          type="button"
          className={s.header__desktop__title}
          onClick={() => handlePageChange(PagePath.MENU)}
        >
          {brandName}
        </button>

        {onDesktop && (
          <div className={s.header__desktop__routing}>
            <button
              className={s.header__desktop__routing__button}
              type="button"
              onClick={() => handlePageChange(PagePath.MENU)}
            >
              <p>Меню</p>
            </button>

            <button
              className={s.header__desktop__routing__button}
              type="button"
              onClick={() => handlePageChange(PagePath.DASHBOARD)}
            >
              <p>Статистика</p>
            </button>

            <button
              className={s.header__desktop__routing__button}
              type="button"
              onClick={() => handlePageChange(PagePath.SETTINGS)}
            >
              <p>Налаштування</p>
            </button>

            <button
              className={s.header__desktop__routing__button}
              type="button"
              onClick={() => handlePageChange(PagePath.NOTIFICATIONS)}
            >
              <p>Повідомленя</p>
            </button>
          </div>
        )}
      </div>

      <nav className={s.header__desktop__nav}>
        <div
          className={s.header__desktop__nav__pacifier}
          onMouseEnter={() => {
            handlePhoneModalClose();
          }}
        />

        <div className={s.header__desktop__nav__item__wrapper}>
          <div className={classNames(
            s.header__desktop__phone,
            [onBigDesktop && s.header__desktop__phone__big],
          )}
          >
            <button
              type="button"
              className={`${s.header__desktop__nav__item} ${s.header__desktop__nav__item__phone}`}
              onMouseEnter={() => {
                handleLikeModalClose();
                handlePhoneModalOpener();
              }}
            >
              <div
                className={`${s.header__desktop__logo__phone} ${s.header__desktop__logo}`}
              />
            </button>

            {onBigDesktop && (
              <span className={s.header__desktop__phone__title}> +38 (067) 123 45 67 </span>
            )}
          </div>

          {isPhoneModalOpen && (
            <div
              className={s.header__desktop__nav__item__modal__phone}
              onMouseEnter={handlePhoneModalOpener}
              onMouseLeave={handlePhoneModalClose}
            >
              <a
                href="tel:+380990435879"
                className={s.header__desktop__nav__item__modal__phone__numbers}
              >
                <img
                  src={kyivStarIcon}
                  alt="kyivStarIcon"
                  className={s.header__desktop__nav__item__modal__phone__numbers__icon}
                />

                <p
                  className={s.header__desktop__nav__item__modal__phone__numbers__title}
                >
                  +38 (099) 043 58 79
                </p>
              </a>

              <a
                href="tel:+380990435879"
                className={s.header__desktop__nav__item__modal__phone__numbers}
              >
                <img
                  src={lifeCell}
                  alt="kyivStarIcon"
                  className={s.header__desktop__nav__item__modal__phone__numbers__icon}
                />

                <p
                  className={s.header__desktop__nav__item__modal__phone__numbers__title}
                >
                  +38 (099) 043 58 79
                </p>
              </a>

              <p
                className={
                  s.header__desktop__nav__item__modal__phone__description
                }
              >
                Дзвоніть нам з 9:00 до 22:00 без вихідних
              </p>
            </div>
          )}
        </div>

        {!is467 && (
          <div className={s.header__desktop__nav__item__wrapper}>
            <button
              type="button"
              className={`${s.header__desktop__nav__item} ${s.header__desktop__nav__item__like}`}
              onMouseEnter={() => {
                handlePhoneModalClose();
                handleRegistrationModalClose();
                handleLikeModalOpener();
              }}
              onClick={handleLikePageOpen}
            >
              <div
                className={`${s.header__desktop__logo__like} ${s.header__desktop__logo}`}
              />
            </button>

            {(isLikeModalOpen && !isUserAuth) && (
              <div className={s.header__desktop__nav__item__modal__like}>
                <>
                  <div className={s.header__desktop__nav__item__modal__like__info}>
                    <p
                      className={s.header__desktop__nav__item__modal__like__info__title}
                    >
                      Для перегляду вибраних товарів вам потрібно авторизуватися
                    </p>
                  </div>
                  <p
                    className={s.header__desktop__nav__item__modal__like__description}
                  >
                    Увійти за допомогою
                  </p>
                  <div
                    className={s.header__desktop__nav__item__modal__like__registration}
                  >
                    <button
                      type="button"
                      className={s.header__desktop__nav__item__modal__like__registration__button}
                    >
                      <img
                        src={facebookIcon}
                        alt="facebookIcon"
                        className={s.header__desktop__nav__item__modal__like__registration__button__icon}
                      />
                    </button>

                    <button
                      type="button"
                      className={s.header__desktop__nav__item__modal__like__registration__button}
                    >
                      <img
                        src={googleIcon}
                        alt="googleIcon"
                        className={s.header__desktop__nav__item__modal__like__registration__button__icon}
                      />
                    </button>
                  </div>
                  <p
                    className={s.header__desktop__nav__item__modal__like__description__down}
                  >
                    aбо авторизуватися на сайті
                  </p>
                  <button
                    type="button"
                    className={s.header__desktop__nav__item__modal__like__button__sign}
                    onClick={handleLoginOpen}
                  >
                    <p
                      className={s.header__desktop__nav__item__modal__like__button__sign__text}
                    >
                      Увійти
                    </p>
                  </button>
                  <button
                    type="button"
                    className={s.header__desktop__nav__item__modal__like__button__sign__up}
                    onClick={handleRegisterOpen}
                  >
                    <p
                      className={s.header__desktop__nav__item__modal__like__button__sign__up__text}
                    >
                      Зареєструватися
                    </p>
                  </button>
                </>
              </div>
            )}
          </div>
        )}

        {!is576 && (
          <div>
            <button
              type="button"
              className={`${s.header__desktop__nav__item} ${s.header__desktop__nav__item__human}`}
              onMouseEnter={() => {
                handleLikeModalClose();
                handleRegistrationModalOpener();
              }}
            >
              <div
                className={`${s.header__desktop__logo__human} ${s.header__desktop__logo}`}
              />
            </button>

            {isRegistrationModalOpen && (
              <div
                onMouseEnter={() => {
                  handleRegistrationModalOpener();
                }}
                onMouseLeave={() => {
                  handleRegistrationModalClose();
                }}
              >
                <div className={classNames(
                  [isUserAuth
                    ? s.header__desktop__nav__item__modal__registration__auth
                    : s.header__desktop__nav__item__modal__registration,
                  ],
                )}
                >
                  {!isUserAuth ? (
                    <>
                      <p
                        className={s.header__desktop__nav__item__modal__registration__description}
                      >
                        Увійти за допомогою
                      </p>
                      <div
                        className={s.header__desktop__nav__item__modal__registration__registration}
                      >
                        <button
                          type="button"
                          className={s.header__desktop__nav__item__modal__registration__registration__button}
                        >
                          <img
                            src={facebookIcon}
                            alt="facebookIcon"
                            className={s.header__desktop__nav__item__modal__registration__registration__button__icon}
                          />
                        </button>

                        <button
                          type="button"
                          className={s.header__desktop__nav__item__modal__registration__registration__button}
                        >
                          <img
                            src={googleIcon}
                            alt="googleIcon"
                            className={s.header__desktop__nav__item__modal__registration__registration__button__icon}
                          />
                        </button>
                      </div>
                      <p
                        className={s.header__desktop__nav__item__modal__registration__description__down}
                      >
                        aбо авторизуватися на сайті
                      </p>
                      <button
                        type="button"
                        className={s.header__desktop__nav__item__modal__registration__button__sign}
                        onClick={handleLoginOpen}
                      >
                        <p
                          className={s.header__desktop__nav__item__modal__registration__button__sign__text}
                        >
                          Увійти
                        </p>
                      </button>
                      <button
                        type="button"
                        className={s.header__desktop__nav__item__modal__registration__button__sign__up}
                        onClick={handleRegisterOpen}
                      >
                        <p
                          className={s.header__desktop__nav__item__modal__registration__button__sign__up__text}
                        >
                          Зареєструватися
                        </p>
                      </button>
                    </>
                  ) : (
                    <div className={s.modal__registration__auth}>
                      <nav className={s.modal__registration__auth__nav}>
                        <ul className={s.modal__registration__auth__nav__list}>
                          <button type="button" className={s.modal__registration__auth__nav__list__button}>
                            <img
                              src={historyYellow}
                              alt="1"
                              className={s.modal__registration__auth__nav__list__button__icon}
                            />
                            <p className={s.modal__registration__auth__nav__list__button__text}>
                              Історія замовлень
                            </p>
                          </button>

                          <button type="button" className={s.modal__registration__auth__nav__list__button}>
                            <img
                              src={likeIconYellow}
                              alt="1"
                              className={s.modal__registration__auth__nav__list__button__icon}
                            />
                            <p className={s.modal__registration__auth__nav__list__button__text}>
                              Вибране
                            </p>
                          </button>

                          <button type="button" className={`${s.modal__registration__auth__nav__list__button} ${s.modal__registration__auth__nav__list__button__map}`}>
                            <img
                              src={mapPoint}
                              alt="1"
                              className={s.modal__registration__auth__nav__list__button__icon}
                            />
                            <p className={s.modal__registration__auth__nav__list__button__text}>
                              Адреси доставки
                            </p>

                          </button>
                        </ul>

                        <button
                          type="button"
                          className={s.modal__registration__auth__nav__list__button}
                          onClick={handleLogOut}
                        >
                          <img
                            src={exitLogo}
                            alt="1"
                            className={s.modal__registration__auth__nav__list__button__icon}
                          />
                          <p className={s.modal__registration__auth__nav__list__button__text}>
                            вийти з облікового запису
                          </p>
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={s.header__desktop__cart__container}>
          <button
            type="button"
            className={`${s.header__desktop__cart} ${s.header__desktop__nav__item__cart}`}
            onClick={handleCartModalOpener}
            onMouseEnter={() => {
              handleRegistrationModalClose();
            }}
          >
            {!isCartModalOpen ? (
              <img
                src={cartIcon}
                alt="locationIcon"
                className={`${s.header__desktop__logo__cart} ${s.header__desktop__logo}`}
              />
            ) : (
              <img
                src={closeBurger}
                alt="closeIcon"
                className={`${s.header__desktop__logo__cart__close} ${s.header__desktop__logo}`}
              />
            )}

            <div className={s.header__desktop__cart__count}>{cartItemsCount}</div>
          </button>

          {isCartModalOpen && (
            <OrderModal setIsCartModalOpen={setIsCartModalOpen} />
          )}
        </div>

        {!onDesktop && (
          <div>
            <button
              type="button"
              className={s.header__desktop__nav__item}
              onClick={handleBurgerMenuOpen}
            >
              <img
                src={menuBurger}
                alt="locationIcon"
                className={`${s.header__desktop__logo__menu__burger} ${s.header__desktop__logo}`}
              />
            </button>

            {isBurgerMenuOpen && (
              <BurgerMenu />
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
