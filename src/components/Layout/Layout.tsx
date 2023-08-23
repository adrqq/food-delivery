/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import s from './Layout.module.scss';
import appStyle from '../../App.module.scss';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const Layout: React.FC = () => {
  return (
    <div className={appStyle.app}>
      <div className={appStyle.app__wrapper}>
        <div className={appStyle.app__sidebar}>
          <Sidebar />
        </div>
        <Header />
        <div className={appStyle.app__content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
