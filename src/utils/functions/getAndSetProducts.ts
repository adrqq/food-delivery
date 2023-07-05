/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import ProductService from '../../api/services/ProductService';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  setProductsLength,
  setProductImage,
  removeError,
} from '../../features/products/productsSlice';
import { ErrorType } from '../../types/products';
import { ProductModel } from '../../models/ProductModel';

export const getAndSetProducts = async (
  dispatch: any,
  currentPage: number,
  itemsPerPage: number,
  selectedFilter: string,
  searchQuery: string,
) => {
  console.log('selectedFilter', selectedFilter);
  dispatch(getProductsStart());

  try {
    await ProductService.getProductsChunk(
      currentPage,
      itemsPerPage,
      selectedFilter,
      searchQuery,
    )
      .then(async (data: ProductModel[]) => {
        // eslint-disable-next-line no-console
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
      .then((data) => {
        data.map(async (item: ProductModel) => {
          const { id } = item;

          // if (item.image) {
          //   return;
          // }

          const response = await ProductService.getProductImage(id);

          console.log('id', id);

          const uint8Array = new Uint8Array(response.img.data.data);
          const byteArray = Array.from(uint8Array);
          const base64String = btoa(byteArray.map((item64) => String.fromCharCode(item64)).join(''));

          dispatch(setProductImage({ productId: id, imageData: base64String }));
        });

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
