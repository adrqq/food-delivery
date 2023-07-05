/* eslint-disable max-len */
import React, { useEffect } from 'react';
import s from './NotificationPage.module.scss';
import { NotificationItem } from './components/NotificationItem';
import { Direction } from '../../components/Direction';
import { useAppDispatch } from '../../app/hooks';
import { setPagePath } from '../../features/main/mainSlice';
import { PagePath } from '../../types/PagePath';

export const NotificationPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPagePath(PagePath.NOTIFICATIONS));
  }, []);

  return (
    <div className={s.notif}>
      <header className={s.notif__header}>
        <h1 className={s.notif__header__title}>Повідомлення</h1>
      </header>

      <Direction />

      <div className={s.notif__wrapper}>
        <NotificationItem />

        <NotificationItem />

        <NotificationItem />

        <NotificationItem />

        <NotificationItem />
      </div>
    </div>
  );
};
