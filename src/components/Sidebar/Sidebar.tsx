/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import s from './Sidebar.module.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { logout } from '../../features/users/usersSlice';
import { SelectedPage } from '../../types/selectedPage';
import { setSelectedPage } from '../../features/main/mainSlice';
import { ProductCategory } from '../../types/products';

import { setFilter } from '../../features/products/productsSlice';

import { getAndSetProducts } from '../../utils/functions/getAndSetProducts';
import { Example } from '../../hooks';
import { PagePath } from '../../types/PagePath';

export const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { onDesktop } = Example();

  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);

  const selectedPage = useAppSelector((state) => state.main.selectedPage);

  const handlePageChange = (page: SelectedPage) => {
    dispatch(setSelectedPage(page));
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleFilterClick = (filter: ProductCategory) => {
    dispatch(setFilter(filter));

    navigate(PagePath.MENU, { replace: true });
  };

  return (
    <div className={classNames(
      s.sidebar_container,
      { [s.sidebar_container__overlay]: isSidebarOpen },
    )}
    >
      <div
        className={classNames(
          s.sidebar,
          { [s.sidebar__open]: isSidebarOpen },
        )}
        onMouseEnter={() => onDesktop && setIsSidebarOpen(true)}
        onMouseLeave={() => onDesktop && setIsSidebarOpen(false)}
      >
        <div className={s.sidebar__content}>
          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.GRILL && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.GRILL)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__grill,
              [selectedFilter === ProductCategory.GRILL && s.sidebar__content__logo__icon__grill__active],
            )}
            />
            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__grill,
              )}
              >
                Гриль
              </p>
            )}
          </button>

          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.SOUPS && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.SOUPS)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__soup,
              [selectedFilter === ProductCategory.SOUPS && s.sidebar__content__logo__icon__soup__active],
            )}
            />

            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__soup,
              )}
              >
                Супи
              </p>
            )}
          </button>

          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.SALADS && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.SALADS)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__salad,
              [selectedFilter === ProductCategory.SALADS && s.sidebar__content__logo__icon__salad__active],
            )}
            />

            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__salad,
              )}
              >
                Салати
              </p>
            )}
          </button>

          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.HOT_DISHES && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.HOT_DISHES)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__hot_dishes,
              [selectedFilter === ProductCategory.HOT_DISHES && s.sidebar__content__logo__icon__hot_dishes__active],
            )}
            />

            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__hot_dishes,
              )}
              >
                {onDesktop ? 'Гарячі страви' : 'Гарячі'}
              </p>
            )}
          </button>

          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.DRINKS && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.DRINKS)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__drinks,
              [selectedFilter === ProductCategory.DRINKS && s.sidebar__content__logo__icon__drinks__active],
            )}
            />
            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__drinks,
              )}
              >
                Напої
              </p>
            )}
          </button>

          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.COLD_DISHES && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.COLD_DISHES)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__appetizer,
              [selectedFilter === ProductCategory.COLD_DISHES && s.sidebar__content__logo__icon__appetizer__active],
            )}
            />
            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__appetizer,
              )}
              >
                Закуски
              </p>
            )}
          </button>

          <button
            className={classNames(
              s.sidebar__content__logo,
              [(selectedFilter === ProductCategory.DESSERTS && isSidebarOpen) && s.sidebar__content__logo__active],
            )}
            type="button"
            onClick={() => handleFilterClick(ProductCategory.DESSERTS)}
          >
            <div className={classNames(
              s.sidebar__content__logo__icon,
              s.sidebar__content__logo__icon__desserts,
              [selectedFilter === ProductCategory.DESSERTS && s.sidebar__content__logo__icon__desserts__active],
            )}
            />
            {(isSidebarOpen || !onDesktop) && (
              <p className={classNames(
                s.sidebar__content__logo__text,
                s.sidebar__content__logo__text__desserts,
              )}
              >
                Десерти
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
