/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import s from './DummyProductCard.module.scss';
import { ProductModel } from '../../models/ProductModel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
};

export const DummyProductCard: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        s.product_card,
      )}
    >
      <></>
    </div>
  );
};
