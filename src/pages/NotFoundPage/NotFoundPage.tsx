/* eslint-disable max-len */
import React from 'react';
import s from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  // const

  return (
    <main className={s.bl_page404}>
      <h1 className={s.bl_page404__title}>Помилка 404! Сторінку не знайдено</h1>
      <p className={s.bl_page404__description}>
        Сторінка, яку ви шукаєте, не існує. Можливо, ви помилилися при введенні адреси, або сторінка була видалена.
      </p>
      <div className={s.bl_page404__wrapper}>
        <img className={s.bl_page404__img} src="https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/cloud_warmcasino.png?raw=true" alt="cloud_warmcasino.png" />
        <div className={s.bl_page404__el1} />
        <div className={s.bl_page404__el2} />
        <div className={s.bl_page404__el3} />
        <button
          type="button"
          className={s.bl_page404__link}
          onClick={() => window.location.replace('/')}
        >
          go home
        </button>
      </div>
    </main>
  );
};
