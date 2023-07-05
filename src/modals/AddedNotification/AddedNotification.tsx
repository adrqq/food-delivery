/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import s from './AddedNotification.module.scss';

import checkMarkIcon from '../../images/logos/check-mark-green.svg';
import { useAppSelector } from '../../app/hooks';

export const AddedNotification: React.FC = () => {
  const showAddedNotification = useAppSelector((state) => state.main.showAddedNotification);

  return (
    <div className={classNames(
      s.add_notification,
      [showAddedNotification && s.add_notification__visible],
    )}
    >
      <div className={s.add_notification__check}>
        <img src={checkMarkIcon} alt="check-mark" />
      </div>

      <p className={s.add_notification__text}>
        Добавлено до замовлення
      </p>
    </div>
  );
};
