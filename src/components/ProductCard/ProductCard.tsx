/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import s from './ProductCard.module.scss';
import { ProductModel } from '../../models/ProductModel';
import { PagePath } from '../../types/PagePath';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  calculateCartInfo,
  setSelectedProduct,
} from '../../features/products/productsSlice';

import {
  setShowAddedNotification,
} from '../../features/main/mainSlice';

import { addProductToLocalCartUtil } from '../../utils/functions/addProductToLocalCartUtil';
import { addProductToUserCartUtil } from '../../utils/functions/addProductToUserCartUtil';
import { PcAddButtons } from '../PcAddButtons';

type Props = {
  product: ProductModel,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  const user = useAppSelector((state) => state.users.user);
  const userCart = useAppSelector((state) => state.products.userCart);
  const images = useAppSelector((state) => state.products.images);

  const image = images.find((item) => item.productId === product.id)?.imageData;

  const handleProductClick = async () => {
    console.log('product clicked');

    dispatch(setSelectedProduct(product));

    navigate(PagePath.PRODUCT);
  };

  const handleAddProductToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isUserAuth) {
      addProductToLocalCartUtil(dispatch, product);
    } else {
      addProductToUserCartUtil(dispatch, user, product);
    }

    dispatch(setShowAddedNotification(true));

    setTimeout(() => {
      dispatch(setShowAddedNotification(false));
    }, 1500);

    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  };

  const findProductInCart = () => {
    if (!isUserAuth) {
      if (localStorage.getItem('cart') === null) {
        return false;
      }

      const cart = JSON.parse(localStorage.getItem('cart') as string);

      const isProductInCart = cart.find((item: ProductModel) => item.id === product.id);

      if (isProductInCart?.count >= 1) {
        return isProductInCart;
      }

      return isProductInCart;
    }

    return userCart.find((item: ProductModel) => item?.id === product?.id);
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={classNames(
        s.product_card,
      )}
      onClick={handleProductClick}
    >
      <div className={s.product_card__image__wrapper}>
        {image ? (
          <img
            src={`data:image/jpeg;base64,${image as string || ''}`}
            alt="product"
            className={s.product_card__image}
          />
        ) : (
          <div
            className={s.product_card__image__dummy}
          />
        )}
      </div>

      <div className={s.product_card__content}>
        <div className={s.product_card__content__name}>{product.name}</div>
        <div className={s.product_card__content__ingredients}>
          <span className={s.product_card__content__ingredients__weight}>
            {`${product.weight} гр. -`}
          </span>
          {` ${product.description.slice(0, 70)} ${product.description.length > 70 ? '...' : ''}`}
        </div>

        <div className={s.product_card__content__bottom}>
          {!(findProductInCart()?.count > 0) ? (
            <button
              type="button"
              className={s.product_card__content__bottom__button}
              onClick={(e) => (handleAddProductToCart(e))}
            >
              <p className={s.product_card__content__bottom__button__text}>
                Замовити
              </p>
            </button>
          ) : (
            <PcAddButtons product={product} />
          )}
          <div className={s.product_card__content__bottom__price}>{`${product.price} UAH`}</div>
        </div>
      </div>
    </div>
  );
};
