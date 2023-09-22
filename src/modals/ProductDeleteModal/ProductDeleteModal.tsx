/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import s from './ProductDeleteModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsDeleteProductModalOpen, setIsLogOutModalOpen } from '../../features/main/mainSlice';
import ProductService from '../../api/services/ProductService';
import { ProductModel } from '../../models/ProductModel';
import { setCallProductsUpdate } from '../../features/products/productsSlice';

type Props = {
  product: ProductModel;
};

export const ProductDeleteModal: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async () => {
    try {
      await ProductService.deleteProduct(product.id);

      dispatch(setIsDeleteProductModalOpen(false));

      dispatch(setCallProductsUpdate());

      console.log('Product deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.product_delete}>
      <div className={s.product_delete__window}>
        <h1 className={s.product_delete__window__title}>Ви впевнені що хочете видалити продукт?</h1>
        <div className={s.product_delete__window__buttons}>
          <button
            type="button"
            className={s.product_delete__window__button}
            onClick={handleDeleteProduct}
          >
            Так
          </button>
          <button
            type="button"
            className={s.product_delete__window__button}
            onClick={() => dispatch(setIsDeleteProductModalOpen(false))}
          >
            Ні
          </button>
        </div>
      </div>
    </div>
  );
};
