/* eslint-disable no-console */
/* eslint-disable max-len */
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  setProductsLength,
  setErrorText,
} from '../features/products/productsSlice';

import ProductService from '../api/services/ProductService';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ErrorType } from '../types/products';
import { ProductModel } from '../models/ProductModel';

export const useGetAndSetProducts = async (
  currentPageData?: number,
  itemsPerPageData?: number,
  selectedFilterData?: string,
  searchQueryData?: string,
) => {
  const dispatch = useAppDispatch();

  dispatch(getProductsStart());

  const currentPage = useAppSelector((state) => state.products.currentPage);
  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  function dataChecker<T>(data: T | undefined) {
    if (data === undefined) {
      return false;
    }

    if (typeof data === 'number') {
      return data;
    }

    if (typeof data === 'string') {
      return data;
    }

    return false;
  }

  ProductService.getProductsChunk(
    dataChecker<number>(currentPageData) || currentPage,
    dataChecker<number>(itemsPerPageData) || itemsPerPage,
    dataChecker<string>(selectedFilterData) || selectedFilter,
    dataChecker<string>(searchQueryData) || searchQuery,
  ).then((data: ProductModel[]) => {
    console.log(data);
    dispatch(getProductsSuccess(data));
  })
    .catch(() => {
      dispatch(getProductsFailure(ErrorType.SERVER_ERROR));
    });

  ProductService.getProductsLength(
    dataChecker<string>(selectedFilterData) || selectedFilter,
    dataChecker<string>(searchQueryData) || searchQuery,
  ).then((data: number) => {
    console.log('length', data);

    dispatch(setProductsLength(data));
  })
    .catch(() => {
      dispatch(setErrorText('Can not get products length'));
    });
};
