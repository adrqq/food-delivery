/* eslint-disable max-len */
import React from 'react';
import s from './NotificationItem.module.scss';

export const NotificationItem: React.FC = () => {
  return (
    <button type="button" className={s.notification}>
      <div className={s.notification__order}>
        <p className={s.notification__order__name}>
          Замовлення № 1
        </p>

        <main className={s.notification__order__main}>
          <div className={s.notification__order__main__wrapper}>
            <div className={s.notification__order__main__info}>
              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  імя:
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  Олексій Анісімов
                </p>
              </div>

              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  телефон:
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  380 66 66 66 666
                </p>
              </div>

              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  адреса:
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  м. Київ, вул. Хрещатик, 1
                </p>
              </div>

              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  спосіб оплати:
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  готівка
                </p>
              </div>

              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  коментар
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  немає
                </p>
              </div>

              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  Назва страви
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  Піца
                </p>
              </div>

              <div className={s.notification__order__main__info__item}>
                <p className={s.notification__order__main__info__item__name}>
                  Порція
                </p>

                <p className={s.notification__order__main__info__item__description}>
                  велика
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </button>
  );
};
