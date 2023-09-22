/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch } from '@reduxjs/toolkit';
import ProductService from '../../api/services/ProductService';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  setProductsLength,
  removeError,
  setProductImages,
} from '../../features/products/productsSlice';
import { ErrorType } from '../../types/Products';
import { ProductModel } from '../../models/ProductModel';
import { SortType } from '../../types/SortType';

export const getAndSetProducts = async (
  dispatch: Dispatch,
  currentPage: number,
  itemsPerPage: number,
  selectedFilter: string,
  searchQuery: string,
  sortType: SortType,
) => {
  console.log('CALLING GET AND SET PRODUCTS !!!!!!!!!!!!!!!!!!!!');
  dispatch(getProductsStart());

  try {
    await ProductService.getProductsChunk(
      currentPage,
      itemsPerPage,
      selectedFilter,
      searchQuery,
      sortType,
    )
      .then(async (data: ProductModel[]) => {
        console.log(data);

        const calculatedData = data.map((item: ProductModel) => {
          const { price, packageCost } = item;

          const newPrice = price + packageCost;

          return {
            ...item,
            price: newPrice,
          };
        });

        return calculatedData;
      })
      .then(async (data) => {
        await ProductService.getProductsLength(selectedFilter, searchQuery)
          .then((dataLength: number) => {
            console.log('length', dataLength);
            dispatch(setProductsLength(dataLength));
          });

        return data;
      })
      .then(async (data) => {
        const fetchProductImages = async (imgData: any) => {
          const imageRequests = imgData.map(async (item: ProductModel) => {
            const { id } = item;
            const response = await ProductService.getProductImage(id);
            const uint8Array = new Uint8Array(response.img.data.data);
            const byteArray = Array.from(uint8Array);
            const base64String = btoa(byteArray.map((item64) => String.fromCharCode(item64)).join(''));

            return { productId: id, imageData: base64String };
          });

          const productImages = await Promise.all(imageRequests);

          return productImages;
        };

        const updateProductImages = async () => {
          const productImages = await fetchProductImages(data);

          dispatch(setProductImages(productImages));
        };

        await updateProductImages(); // Trigger the image update

        return data;
      })
      .then((data) => {
        dispatch(getProductsSuccess(data));
      });

    dispatch(removeError(ErrorType.SERVER_ERROR));
  } catch (e) {
    console.log('server error', e);
    dispatch(getProductsFailure(ErrorType.SERVER_ERROR));
  }
};
