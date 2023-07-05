/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './DirectionItem.module.scss';
import { useAppSelector } from '../../../../app/hooks';

type Props = {
  path: string;
};

export const DirectionItem: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();

  const pagePath = useAppSelector((state) => state.main.pagePath);

  const handleClick = () => {
    navigate(`/${pagePath.split('/').slice(1, pagePath.split('/').indexOf(path) + 1).join('/')}`);
  };

  return (
    <div className={s.direction_item}>
      <button
        className={s.direction_item__button}
        type="button"
        onClick={handleClick}
        disabled={pagePath.split('/').indexOf(path) === pagePath.split('/').length - 1}
      >
        <span className={s.direction_item__button__text}>{path}</span>
      </button>

      {pagePath.split('/').indexOf(path) !== pagePath.split('/').length - 1 && (
        <span className={s.direction_item__divider}>
          /
        </span>
      )}
    </div>
  );
};
