/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import s from './NotificationPopup.module.scss';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setProductManageError } from '../../../../../../features/products/productsSlice';

type Props = {
  text: string;
  success: boolean;
};

export const NotificationPopup: React.FC<Props> = ({ text, success }) => {
  const dispatch = useAppDispatch();

  const handlePopupClose = () => {
    dispatch(setProductManageError(''));
  };

  return (
    <button
      type="button"
      className={classNames(
        s.popup__wrapper,
        { [s.popup__wrapper__success]: success },
      )}
      onClick={handlePopupClose}
    >
      <div className={s.popup}>
        <p className={s.popup__text}>{text}</p>
      </div>
    </button>
  );
};
