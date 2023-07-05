/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import s from './PaymentItem.module.scss';
import { ProductModel } from '../../../../models/ProductModel';

type Props = {
  product: ProductModel,
};

export const PaymentItem: React.FC<Props> = ({ product }) => {
  return (
    <div className={s.payment_item}>
      <div className={s.payment_item__wrapper}>
        <p className={s.payment_item__count}>
          {`${product.count} x`}
        </p>

        <p className={s.payment_item__text}>
          {product.name}
        </p>
      </div>
      <p>
        {`${(product.price * product.count).toFixed(2)} UAH`}
      </p>
    </div>
  );
};
