/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ProductCardOrder.module.scss';
import samplePhoto from '../../images/food_photos/foodPhoto.png';
import minusLogo from '../../images/logos/minus-logo.svg';
// import plusIcon from '../../images/logos/plus.svg';
import { Example } from '../../hooks';
import { ProductModel } from '../../models/ProductModel';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { setProductModalOpen } from '../../features/main/mainSlice';
import {
  setLocalStorageCart,
  calculateCartInfo,
  setSelectedProduct,
} from '../../features/products/productsSlice';
import likeIcon from '../../images/logos/heart-icon.svg';

import { addProductToLocalCartUtil } from '../../utils/functions/addProductToLocalCartUtil';
import { addProductToUserCartUtil } from '../../utils/functions/addProductToUserCartUtil';
import { decreaseLocalProductsCountUtil } from '../../utils/functions/decreaseLocalProductsCountUtil';
import { decreaseUserProductsCountUtil } from '../../utils/functions/decreaseUserProductsCountUtil';
import { removeProductFromLocalCartUtil } from '../../utils/functions/removeProductFromLocalCartUtil';
import { removeProductFromUserCartUtil } from '../../utils/functions/removeProductFromUserCart';
import { PagePath } from '../../types/PagePath';
import { PcAddButtons } from '../PcAddButtons';

type Props = {
  product: ProductModel,
};

export const ProductCardOrder: React.FC<Props> = ({ product }) => {
  const { isMobile } = Example();

  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.products.images);

  const image = images.find((item) => item.productId === product.id)?.imageData;

  const navigate = useNavigate();

  const handleProductClick = async () => {
    // eslint-disable-next-line no-console
    console.log('product clicked');

    dispatch(setSelectedProduct(product));

    navigate(PagePath.PRODUCT);
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={s.product__card}
      onClick={() => (handleProductClick())}
    >
      <div className={s.product__card_container}>
        <div className={s.product__card_left}>
          <div className={s.product__card_left__name__wrapper}>
            <p className={s.product__card_left__name__count}>
              {`${product.count}x`}
            </p>

            <div className={s.product__card_left__name}>
              {product.name}
            </div>
          </div>
          <p className={s.product__card_left__description}>
            {`${product.description.split(' ').slice(0, 30).join(' ')}...`}
          </p>

          <div className={s.product__card_left__label}>
            <div className={s.product__card_left__label__weight} />

            <p className={s.product__card_left__label__text}>
              {`${product.weight}g`}
            </p>
          </div>

          <div className={s.product__card_left__price}>
            {`${product.price} UAH`}
          </div>
        </div>

        <div className={s.product__card__right}>
          <img
            src={`data:image/jpeg;base64,${image as string || ''}`}
            alt="product"
            className={s.product__card__right__image}
          />
          <PcAddButtons product={product} />
        </div>
      </div>
    </div>
  );
};
