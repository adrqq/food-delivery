/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import s from './ProductCardCart.module.scss';
import { ProductModel } from '../../models/ProductModel';
import { removeProductFromLocalCartUtil } from '../../utils/functions/removeProductFromLocalCartUtil';
import { PcAddButtons } from '../PcAddButtons';
import { removeProductFromUserCartUtil } from '../../utils/functions/removeProductFromUserCart';

type Props = {
  product: ProductModel;
};

export const ProductCardCart: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  const user = useAppSelector((state) => state.users.user);
  const images = useAppSelector((state) => state.products.images);

  const image = images.find((item) => item.productId === product.id)?.imageData;

  const handleRemoveProductFromCart = () => {
    if (isUserAuth) {
      removeProductFromUserCartUtil(dispatch, user, product);
    } else {
      removeProductFromLocalCartUtil(dispatch, product);
    }
  };

  return (
    <div className={s.product__card}>
      <img
        src={`data:image/jpeg;base64,${image as string || ''}`}
        alt="product"
        className={s.product__card__img}
      />

      <button
        type="button"
        className={s.product__card__delete__button}
        onClick={handleRemoveProductFromCart}
      >
        <div className={s.product__card__delete__button__img} />
      </button>

      <div className={s.product__card__info__container}>
        <p className={s.product__card__info__name}>
          {product.name}
        </p>

        <p className={s.product__card__info__description}>
          {`велика / ${product.weight}г`}
        </p>

        <div className={s.product__card__info__price__wrapper}>
          <p className={s.product__card__info__price__number}>
            {`${product.price} UAH`}
          </p>

          <p className={s.product__card__info__price__title}>
            грн
          </p>
        </div>

        <div className={s.product__card__info__price}>
          {/* <div className={s.product__card__info__control} /> */}

          <div className={s.product__card__info__control}>
            <PcAddButtons product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

{ /* <button
type="button"
className={s.product__card__info__control__button}
>
<div className={s.product__card__info__control__button__minus} />
</button>

<p className={s.product__card__info__control__count}>
{product.count}
</p>

<button
type="button"
className={s.product__card__info__control__button}
>
<div className={s.product__card__info__control__button__plus} />
</button> */ }
