/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable padded-blocks */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SearchPage } from './pages/SearchPage';
import { BurgerMenu } from './components/BurgerMenu';
import { DashboardPage } from './pages/DashboardPage';
import { ProductModal } from './modals/ProductModal';
import s from './App.module.scss';
import { MenuPage } from './pages/MenuPage';
import { OrderSecondStage } from './pages/MenuPage/components/OrderSecondStage';
import { SettingsPage } from './pages/SettingsPage';
import { PageLoader } from './components/PageLoader';
import { Header } from './components/Header';

import { getProducts, getProductsLength, getProductsChunk } from './api/products';
import ProductService from './api/services/ProductService';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { ErrorType } from './types/products';
import { ProductModel } from './models/ProductModel';
import { OrderMobile } from './pages/MenuPage/components/OrderMobile';
import { PagePath } from './types/PagePath';

import {
  setLocalStorageCart,
  calculateCartInfo,
} from './features/products/productsSlice';
import { AuthPage } from './pages/AuthPage';
// import { ProductPage } from './pages/ProductPage';

import { getAndSetProducts } from './utils/functions/getAndSetProducts';

import { checkAuth, setIsUsersLoading } from './features/users/usersSlice';
import { ProductManagement } from './pages/SettingsPage/components/EditingBlock/components/ProductManagement';
import { Security } from './pages/SettingsPage/components/EditingBlock/components/Security';
import { NotFoundPage } from './pages/NotFoundPage';
import { PaymentMobile } from './pages/PaymentMobile';
import { Example } from './hooks';
import { SidebarMobile } from './components/SidebarMobile';
// import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { getAndSetUserCartUtil } from './utils/functions/getAndSetUserCartUtil';
import { NotificationPage } from './pages/NotificationPage';
import { CreateProduct } from './pages/SettingsPage/components/EditingBlock/components/CreateProduct';
import { Login } from './pages/AuthPage/components/Login';
import { Registration } from './pages/AuthPage/components/Registration';
import { EditProduct } from './pages/SettingsPage/components/EditingBlock/components/EditProduct';
import { LogOutModal } from './modals/LogOutModal';
import { ActivationPage } from './pages/ActivationPage';
import { AppRouter } from './components/AppRouter';

function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const isProductModalOpen = useAppSelector((state) => state.main.isProductModalOpen);
  const isLogOutModalOpen = useAppSelector((state) => state.main.isLogOutModalOpen);
  const userCart = useAppSelector((state) => state.products.userCart);

  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  const isUsersLoading = useAppSelector((state) => state.users.isUsersLoading);

  const user = useAppSelector((state) => state.users.user);
  const localStorageCart = useAppSelector((state) => state.products.localStorageCart);

  const { onDesktop } = Example();

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  }, [localStorageCart, userCart, isUserAuth]);

  useEffect(() => {
    console.log('get and set products');
    getAndSetProducts(dispatch, currentPage, itemsPerPage, selectedFilter, searchQuery);
  }, [currentPage, itemsPerPage, selectedFilter, searchQuery]);

  useEffect(() => {
    dispatch(setIsUsersLoading(true));

    if (!isUserAuth) {
      const cart = JSON.parse(localStorage.getItem('cart') as string);

      if (cart) {
        dispatch(setLocalStorageCart(cart));
      }
    }

    if (localStorage.getItem('token')) {
      console.log('check auth');

      dispatch(checkAuth()).then((res) => {
        if (typeof res === 'string') {
          navigate(PagePath.ACTIVATION, { replace: true });
        }

        setTimeout(() => {
          dispatch(setIsUsersLoading(false));
        }, 1300);
      }).catch(() => {
        setTimeout(() => {
          dispatch(setIsUsersLoading(false));
        }, 1300);
      });
    } else {
      setTimeout(() => {
        dispatch(setIsUsersLoading(false));
      }, 1300);
    }

    getAndSetUserCartUtil(dispatch, isUserAuth, user, products);
  }, []);

  useEffect(() => {
    if (isUserAuth) {
      getAndSetUserCartUtil(dispatch, isUserAuth, user, products);
    }
  }, [isUserAuth]);

  return (
    <>
      {isUsersLoading && <PageLoader />}
      <OrderSecondStage />
      {isProductModalOpen && <ProductModal />}
      {isLogOutModalOpen && <LogOutModal />}
      <AppRouter />
    </>
  );
}

export default App;
