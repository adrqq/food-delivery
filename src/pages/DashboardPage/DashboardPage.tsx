import React, { useEffect } from 'react';
import s from './DashboardPage.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { setPagePath } from '../../features/main/mainSlice';
import { PagePath } from '../../types/PagePath';

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPagePath(PagePath.DASHBOARD));
  });

  return (
    <div className={s.dashboard}>
      Dashboard
    </div>
  );
};
