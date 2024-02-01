/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import s from './Layout.module.scss';
import appStyle from '../../App.module.scss';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
  isSidebar?: boolean;
  isHeader?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  isSidebar = true,
  isHeader = true,
}) => {
  return (
    <div className={
      classNames(appStyle.app)
    }
    >
      {isSidebar && (
        <div className={appStyle.app__sidebar}>
          <Sidebar />
        </div>
      )}

      {isHeader && <Header />}

      <div className={
        classNames(appStyle.app__content, {
          [s.layout__no_sidebar]: !isSidebar,
          [s.layout__no_header]: !isHeader,
        })
      }
      >
        <Outlet />
      </div>
    </div>
  );
};
