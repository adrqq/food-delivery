/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-lone-blocks */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/void-dom-elements-no-children */
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import classNames from 'classnames';
import { Scrollbar } from 'swiper';
import s from './MainHeader.module.scss';
import { ProductCategory, ErrorType } from '../../types/products';
import { ProductModel } from '../../models/ProductModel';
import { Example } from '../../hooks';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/scrollbar';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setFilter,
  getProductsFailure,
  getProductsSuccess,
  getProductsStart,
  setProductsLength,
  setErrorText,
  setSearchQuery,
} from '../../features/products/productsSlice';

import { setOrderMenuOpen } from '../../features/main/mainSlice';

import {
  getProductsChunk,
  getProductsLength,
} from '../../api/products';

// import required modules

export const MainHeader: React.FC = () => {
  const {
    isMobile,
    isMobileMini,
    smallHight,
  } = Example();

  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const isOrderMenuOpen = useAppSelector((state) => state.main.isOrderMenuOpen);

  const handleSearch = (searchValue: string) => {
    console.log(searchValue);

    dispatch(setSearchQuery(searchValue));

    dispatch(getProductsStart());

    getProductsChunk(1, itemsPerPage, selectedFilter, searchValue).then((data: ProductModel[]) => {
      dispatch(getProductsSuccess(data));

      console.log(data);
    })
      .catch(() => {
        dispatch(getProductsFailure(ErrorType.SERVER_ERROR));
      });

    getProductsLength(selectedFilter, searchValue).then((data: number) => {
      console.log('length', data);

      dispatch(setProductsLength(data));
    })
      .catch(() => {
        dispatch(setErrorText('Can not get products length'));
      });
  };

  console.log(`isMobile ${isMobile}`);

  return (
    <div className={s.header}>
      {isMobile ? (
        <div className={s.mobile_header__wrapper}>
          <div className={s.mobile_header__info}>
            <div className={s.mobile_header__title}>
              Bundoshki
            </div>
            <div className={s.mobile_header__date}>
              {Date().slice(3, 10)}
            </div>
          </div>

          {!isMobileMini ? (
            <div className={s.mobile_button_position}>
              {!isOrderMenuOpen && (
                <button
                  type="button"
                  className={s.home_page__main_order_opener}
                  onClick={() => dispatch(setOrderMenuOpen(true))}
                >
                  <div className={s.home_page__main_order_opener_item}>
                    <div className={s.home_page__main_order_opener_images} />

                    <div className={s.home_page__main_order_opener_text}>
                      2 dishes for 92 UAH
                    </div>

                    <div className={s.home_page__main_order_opener_button}>
                      <img
                        className={s.home_page__main_order_opener_button_img}
                        src=""
                        alt=""
                      />
                    </div>
                  </div>
                </button>
              )}

              <NavLink to="home/search">
                <button
                  type="button"
                  className={s.mobile_header__search}
                />
              </NavLink>

              {smallHight && (
                <button
                  type="button"
                  className={s.mobile_header__burger}
                />
              )}

            </div>
          ) : (
            <div>
              <NavLink to="home/search">
                <button
                  type="button"
                  className={s.mobile_header__search}
                />
              </NavLink>

              <NavLink to="home/burger-menu">
                <button
                  type="button"
                  className={s.mobile_header__burger}
                />
              </NavLink>
            </div>
          )}
        </div>
      ) : (
        <div className={s.header__wrapper}>
          <div className={s.header__info}>
            <div className={s.header__title}>
              Bundoshki
            </div>
            <div className={s.header__date}>
              {Date().slice(3, 10)}
            </div>
          </div>

          {!isMobileMini && (
            <div className={s.tablet_button_position}>
              {!isOrderMenuOpen && (
                <button
                  type="button"
                  className={s.home_page__main_order_opener}
                  onClick={() => dispatch(setOrderMenuOpen(true))}
                >
                  <div className={s.home_page__main_order_opener_item}>
                    <div className={s.home_page__main_order_opener_images} />

                    <div className={s.home_page__main_order_opener_text}>
                      2 dishes for 92 UAH
                    </div>

                    <div className={s.home_page__main_order_opener_button}>
                      <img
                        className={s.home_page__main_order_opener_button_img}
                        src=""
                        alt=""
                      />
                    </div>
                  </div>
                </button>
              )}

              {smallHight ? (
                <>
                  <NavLink to="home/search">
                    <button
                      type="button"
                      className={s.mobile_header__search}
                    />
                  </NavLink>

                  <NavLink to="home/burger-menu">
                    <button
                      type="button"
                      className={s.mobile_header__burger}
                    />
                  </NavLink>
                </>
              ) : (
                <input
                  type="text"
                  className={classNames(
                    s.header__search,
                    { [s.header__search__order_menu_close]: !isOrderMenuOpen },
                  )}
                  placeholder="Search for food, coffee, etc.."
                  onChange={(event) => {
                    setTimeout(() => {
                      handleSearch(event.target.value);
                    }, 1500);
                  }}
                />
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
