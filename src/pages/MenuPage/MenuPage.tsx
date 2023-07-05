/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import s from './MenuPage.module.scss';
import { Menu } from './components/Menu';
import { Order } from './components/Order';
// import productCardLogo from '../../images/logos/product_item-logo';
import { Example } from '../../hooks';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { calculateCartInfo } from '../../features/products/productsSlice';

import {
  setOrderMenuOpen,
  setSelectedPage,
  setPagePath,
} from '../../features/main/mainSlice';

import { SelectedPage } from '../../types/selectedPage';
import { Direction } from '../../components/Direction';
import { PagePath } from '../../types/PagePath';
import { AddedNotification } from '../../modals/AddedNotification';

export const MenuPage: React.FC = () => {
  const { isMobile, isMobileMini } = Example();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOrderMenuOpen = useAppSelector((state) => state.main.isOrderMenuOpen);

  useEffect(() => {
    dispatch(setPagePath(PagePath.MENU));
    dispatch(setSelectedPage(SelectedPage.HOME));
  });

  const handleOpenOrderMobile = () => {
    navigate('/home/order-mobile');
  };

  return (
    <div className={classNames(
      s.menu_page,
      { [s.menu_page__order_menu_close]: !isOrderMenuOpen },
    )}
    >
      <AddedNotification />
      <Direction />
      <div className={s.menu_page__main}>
        <Menu isOrderMenuOpen={isOrderMenuOpen} />
      </div>
    </div>
  );
};
