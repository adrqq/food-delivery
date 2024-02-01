/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import s from './MenuPage.module.scss';
import { Menu } from './components/Menu';
import { Example } from '../../hooks';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  setPagePath,
} from '../../features/main/mainSlice';

import { Direction } from '../../components/Direction';
import { PagePath } from '../../types/PagePath';
import { AddedNotification } from '../../modals/AddedNotification';

export const MenuPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOrderMenuOpen = useAppSelector((state) => state.main.isOrderMenuOpen);

  useEffect(() => {
    dispatch(setPagePath(PagePath.MENU));
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
      <div className={s.menu_page__main}>
        <Direction />
        <Menu isOrderMenuOpen={isOrderMenuOpen} />
      </div>
    </div>
  );
};
