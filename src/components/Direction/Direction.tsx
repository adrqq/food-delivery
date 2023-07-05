/* eslint-disable react/no-array-index-key */
import React from 'react';
import s from './Direction.module.scss';
import { DirectionItem } from './components/DirectionItem';
import { useAppSelector } from '../../app/hooks';

type Props = {

};

export const Direction: React.FC<Props> = () => {
  const pagePath = useAppSelector((state) => state.main.pagePath);

  return (
    <div className={s.direction}>
      {pagePath.split('/').slice(1).map((path, index) => (
        <DirectionItem
          key={index}
          path={path}
        />
      ))}
    </div>
  );
};
