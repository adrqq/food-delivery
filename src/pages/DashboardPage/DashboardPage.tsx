import React, { useEffect } from 'react';
import { Main } from './components/Main';
import { PageInfo } from './components/PageInfo';
import s from './DashboardPage.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { setSelectedPage } from '../../features/main/mainSlice';
import { SelectedPage } from '../../types/selectedPage';

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPage(SelectedPage.DASHBOARD));
  });

  return (
    <div className={s.dashboard}>
      <Main />

      <PageInfo />
    </div>
  );
};
