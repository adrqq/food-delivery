/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ProductManagementItem.module.scss';
import { ProductModel } from '../../../../../../../../models/ProductModel';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import ProductService from '../../../../../../../../api/services/ProductService';

import editIcon from '../../../../../../../../images/logos/edit-icon-yellow.svg';
import deleteIcon from '../../../../../../../../images/logos/trash-icon.svg';
import { PagePath } from '../../../../../../../../types/PagePath';
import { setSelectedEditProduct } from '../../../../../../../../features/products/productsSlice';
import { setIsDeleteProductModalOpen } from '../../../../../../../../features/main/mainSlice';
import { ProductDeleteModal } from '../../../../../../../../modals/ProductDeleteModal';

type Props = {
  product: ProductModel;
};

export const ProductManagementItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const images = useAppSelector((state) => state.products.images);
  const isDeleteProductModalOpen = useAppSelector((state) => state.main.isDeleteProductModalOpen);

  const image = images.find((img) => img.productId === product.id)?.imageData;

  const handleDeleteProduct = async () => {
    dispatch(setIsDeleteProductModalOpen(true));
  };

  const handleEditProduct = () => {
    dispatch(setSelectedEditProduct(product));

    navigate(PagePath.SETTINGS__MANAGEMENT__EDIT);
  };

  return (
    <>
      {isDeleteProductModalOpen && <ProductDeleteModal product={product} />}
      <div
        className={s.product_card}
      // onClick={handleProductClick}
      >
        <div className={s.product_card__image__wrapper}>
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="product"
            className={s.product_card__image}
          />
        </div>

        <div className={s.product_card__content}>
          <div className={s.product_card__content__name}>{product.name}</div>
          <div className={s.product_card__content__ingredients}>
            <span className={s.product_card__content__ingredients__weight}>
              {`${product.weight} гр. -`}
            </span>
            {product.description}
          </div>
        </div>

        <div className={s.product_card__content__bottom}>
          <button
            type="button"
            onClick={handleEditProduct}
            className={`${s.product_card__content__bottom__button} ${s.product_card__content__bottom__button__edit}`}
          >
            <p className={s.product_card__content__bottom__button__text}>
              Редагувати
            </p>

            <img
              className={s.product_card__content__bottom__button__icon}
              src={editIcon}
              alt="edit"
            />
          </button>

          <button
            type="button"
            onClick={handleDeleteProduct}
            className={`${s.product_card__content__bottom__button} ${s.product_card__content__bottom__button__delete}`}
          >
            <p className={s.product_card__content__bottom__button__text}>
              Видалити
            </p>

            <img
              className={s.product_card__content__bottom__button__icon}
              src={deleteIcon}
              alt="delete"
            />
          </button>
        </div>
      </div>
    </>
  );
};
