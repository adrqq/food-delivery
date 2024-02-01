/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable padded-blocks */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ProductModal } from './modals/ProductModal';
import s from './App.module.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { PagePath } from './types/PagePath';

import {
  setLocalStorageCart,
  calculateCartInfo,
} from './features/products/productsSlice';

import { getAndSetProducts } from './utils/functions/getAndSetProducts';

import { checkAuth, setIsUsersLoading } from './features/users/usersSlice';
import { getAndSetUserCartUtil } from './utils/functions/getAndSetUserCartUtil';
import { LogOutModal } from './modals/LogOutModal';
import { AppRouter } from './components/AppRouter';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    isUserAuth,
    user,
  } = useAppSelector((state) => state.users);

  const {
    products,
    currentPage,
    itemsPerPage,
    selectedFilter,
    searchQuery,
    userCart,
    localStorageCart,
    sortType,
    callProductsUpdate,
  } = useAppSelector((state) => state.products);

  const {
    isProductModalOpen,
    isLogOutModalOpen,
  } = useAppSelector((state) => state.main);

  useEffect(() => {
    getAndSetProducts(
      dispatch,
      currentPage,
      itemsPerPage,
      selectedFilter,
      searchQuery,
      sortType,
    );
  }, [
    currentPage,
    itemsPerPage,
    selectedFilter,
    callProductsUpdate,
    sortType,
  ]);

  useEffect(() => {
    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  }, [localStorageCart, userCart, isUserAuth]);

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
      {isProductModalOpen && <ProductModal />}
      {isLogOutModalOpen && <LogOutModal />}
      <AppRouter />
    </>
  );
}

export default App;
