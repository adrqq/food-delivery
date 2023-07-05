/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './BurgerMenuButton.module.scss';

export const BurgerMenuButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBurgerOpen = () => {
    console.log('burger');

    navigate('/home/burger-menu');
  };

  return (
    <button
      aria-label="open-burger-menu"
      type="button"
      className={s.burger_menu_button}
      onClick={handleBurgerOpen}
    />
  );
};
