/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-lone-blocks */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/void-dom-elements-no-children */
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import classNames from 'classnames';
// import { Scrollbar } from 'swiper';
// import { BurgerMenuButton } from '../../UI/BurgerMenuButton';
import s from './Header.module.scss';
import { ProductCategory, ErrorType } from '../../types/Products';
// import { ProductModel } from '../../models/ProductModel';
import { Example } from '../../hooks';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/scrollbar';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setFilter,
  setSearchQuery,
} from '../../features/products/productsSlice';

import { setOrderMenuOpen } from '../../features/main/mainSlice';

import { getAndSetProducts } from '../../utils/functions/getAndSetProducts';
import { HeaderDesktop } from './components/HeaderDesktop';

export const Header: React.FC = () => {
  const {
    is373,
    is1024,
  } = Example();

  const dispatch = useAppDispatch();

  const {
    selectedFilter,
    itemsPerPage,
    searchQuery,
    sortType,
  } = useAppSelector((state) => state.products);

  const navigate = useNavigate();

  const handleFilterClick = (filter: ProductCategory) => {
    console.log(filter);
    dispatch(setFilter(filter));

    getAndSetProducts(dispatch, 1, itemsPerPage, filter, searchQuery, sortType);
  };

  const handleSearch = (searchValue: string) => {
    console.log(searchValue);

    dispatch(setSearchQuery(searchValue));

    getAndSetProducts(dispatch, 1, itemsPerPage, selectedFilter, searchQuery, sortType);
  };

  const handleOpenMobileSearch = () => {
    navigate('/home/search', { replace: true });
  };

  const handleOrderMenuOpen = () => {
    if (is1024) {
      navigate('/home/order-mobile', { replace: true });
    } else {
      dispatch(setOrderMenuOpen(true));
    }
  };

  return (
    <>
      <HeaderDesktop />
    </>
  );
};
