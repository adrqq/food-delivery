import React, { useEffect } from 'react';
import { EditingBlock } from './components/EditingBlock';
import { SelectorBar } from './components/SelectorBar';
import s from './SettingsPage.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { setSelectedPage, setPagePath } from '../../features/main/mainSlice';
import { SelectedPage } from '../../types/selectedPage';
import { Direction } from '../../components/Direction';
import { PagePath } from '../../types/PagePath';

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPagePath(PagePath.SETTINGS));
    dispatch(setSelectedPage(SelectedPage.SETTINGS));
  });

  return (
    <div className={s.settings}>
      <header className={s.settings__header}>
        <h1 className={s.settings__header__title}>Налаштування</h1>
      </header>

      <Direction />

      <main className={s.settings__main}>
        <SelectorBar />

        <EditingBlock />
      </main>
    </div>
  );
};
