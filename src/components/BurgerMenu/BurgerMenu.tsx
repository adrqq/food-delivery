/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import s from './BurgerMenu.module.scss';
import { PagePath } from '../../types/PagePath';
// import { Example } from '../../hooks';
import { setIsBurgerMenuOpen } from '../../features/main/mainSlice';
import closeBurger from '../../images/logos/close-black.svg';

import grillLogo from '../Sidebar/assets/icons/grill.svg';
import freshDrinksLogo from '../Sidebar/assets/icons/fresh-drink.svg';
import soupLogo from '../Sidebar/assets/icons/soup.svg';
import saladLogo from '../Sidebar/assets/icons/salad.svg';
import hotDishesLogo from '../Sidebar/assets/icons/hot-dishes.svg';
import appetizerLogo from '../Sidebar/assets/icons/appetizer.svg';
import dessertLogo from '../Sidebar/assets/icons/dessert.svg';
import { ProductCategory } from '../../types/Products';
import { setFilter } from '../../features/products/productsSlice';

export const BurgerMenu: React.FC = () => {
  const [active, setActive] = useState<PagePath>(PagePath.MENU);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBurgerMenuClose = () => {
    dispatch(setIsBurgerMenuOpen(false));
  };

  const handlePageChange = (pageUrl: string) => {
    navigate(pageUrl, { replace: true });
  };

  const handleActiveBurgerChange = (nameOfPage: PagePath) => {
    setActive(nameOfPage);
  };

  const handleFilterClick = (filter: ProductCategory) => {
    dispatch(setFilter(filter));

    navigate(PagePath.MENU, { replace: true });

    dispatch(setIsBurgerMenuOpen(false));
  };

  return (
    <div className={s.burger_menu__container}>
      <div className={s.burger_menu}>
        <button
          className={s.burger_menu__close__button}
          type="button"
          onClick={handleBurgerMenuClose}
        >
          <img
            className={s.burger_menu__close__icon}
            src={closeBurger}
            alt="close-burger-menu-icon"
          />
        </button>

        <h2 className={s.burger_menu__text__h2}>
          Категорії товарів
        </h2>

        <nav className={s.burger_menu__list}>
          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.GRILL)}
          >
            <img src={grillLogo} alt="grill-logo" />

            <p className={s.burger_menu__list__item__text}>
              Гриль
            </p>
          </button>

          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.SOUPS)}
          >
            <img src={soupLogo} alt="soup-logo" />

            <p className={s.burger_menu__list__item__text}>
              Супи
            </p>
          </button>

          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.SALADS)}
          >
            <img src={saladLogo} alt="salad-logo" />

            <p className={s.burger_menu__list__item__text}>
              Салати
            </p>
          </button>

          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.HOT_DISHES)}
          >
            <img src={hotDishesLogo} alt="hot-dishes-logo" />

            <p className={s.burger_menu__list__item__text}>
              Гарячі Страви
            </p>
          </button>

          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.DRINKS)}
          >
            <img src={freshDrinksLogo} alt="drinks-logo" />

            <p className={s.burger_menu__list__item__text}>
              Напої
            </p>
          </button>

          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.COLD_DISHES)}
          >
            <img src={appetizerLogo} alt="appetizer-logo" />

            <p className={s.burger_menu__list__item__text}>
              Закуски
            </p>
          </button>

          <button
            className={s.burger_menu__list__item}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.DESSERTS)}
          >
            <img src={dessertLogo} alt="dessert-logo" />

            <p className={s.burger_menu__list__item__text}>
              Десерти
            </p>
          </button>
        </nav>

        <section
          className={s.burger_menu__routes}
        >
          <button
            type="button"
            className={classNames(
              s.burger_menu__routes__button,
              [active === PagePath.MENU && s.burger_menu__routes__button__active],
            )}
            onClick={() => {
              handleBurgerMenuClose();
              handlePageChange(PagePath.MENU);
              handleActiveBurgerChange(PagePath.MENU);
            }}
          >
            Меню
          </button>

          <button
            type="button"
            className={classNames(
              s.burger_menu__routes__button,
              [active === PagePath.DASHBOARD && s.burger_menu__routes__button__active],
            )}
            onClick={() => {
              handleBurgerMenuClose();
              handlePageChange(PagePath.DASHBOARD);
              handleActiveBurgerChange(PagePath.DASHBOARD);
            }}
          >
            Статистика
          </button>

          <button
            type="button"
            className={classNames(
              s.burger_menu__routes__button,
              [active === PagePath.SETTINGS && s.burger_menu__routes__button__active],
            )}
            onClick={() => {
              handleBurgerMenuClose();
              handlePageChange(PagePath.SETTINGS);
              handleActiveBurgerChange(PagePath.SETTINGS);
            }}
          >
            Налаштування
          </button>

          <button
            type="button"
            className={classNames(
              s.burger_menu__routes__button,
              [active === PagePath.NOTIFICATIONS && s.burger_menu__routes__button__active],
            )}
            onClick={() => {
              handleBurgerMenuClose();
              handlePageChange(PagePath.NOTIFICATIONS);
              handleActiveBurgerChange(PagePath.NOTIFICATIONS);
            }}
          >
            Повідомлення
          </button>
        </section>

        <button type="button" className={s.burger_menu__auth}>
          <p>
            Увійти в свій обліковий запис
          </p>
        </button>
      </div>
    </div>
  );
};
