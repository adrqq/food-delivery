import React from 'react';
import classNames from 'classnames';
import s from './SidebarMobile.module.scss';

export const SidebarMobile: React.FC = () => {
  return (
    <div className={s.sidebar_mobile_container}>
      <div className={s.sidebar_mobile}>
        <div className={s.sidebar_mobile__content}>
          <div className={s.sidebar_mobile__content__logo}>
            <div className={classNames(
              s.sidebar_mobile__content__logo__icon,
              s.sidebar_mobile__content__logo__icon__grill,
            )}
            />

            <div className={s.sidebar_mobile__content__logo_text}>
              Гриль
            </div>
          </div>

          <button
            className={s.sidebar_mobile__content__logo}
            type="button"
          >
            <div className={classNames(
              s.sidebar_mobile__content__logo__icon,
              s.sidebar_mobile__content__logo__icon__soup,
            )}
            />

            <div className={s.sidebar_mobile__content__logo_text}>
              Супи
            </div>
          </button>

          <button
            className={s.sidebar_mobile__content__logo}
            type="button"
          >
            <div className={classNames(
              s.sidebar_mobile__content__logo__icon,
              s.sidebar_mobile__content__logo__icon__hot_dishes,
            )}
            />

            <div className={s.sidebar_mobile__content__logo_text}>
              Гарячі
            </div>
          </button>

          <button
            className={s.sidebar_mobile__content__logo}
            type="button"
          >
            <div className={classNames(
              s.sidebar_mobile__content__logo__icon,
              s.sidebar_mobile__content__logo__icon__drinks,
            )}
            />

            <div className={s.sidebar_mobile__content__logo_text}>
              Напої
            </div>
          </button>

          <button
            className={s.sidebar_mobile__content__logo}
            type="button"
          >
            <div className={classNames(
              s.sidebar_mobile__content__logo__icon,
              s.sidebar_mobile__content__logo__icon__coffee,
            )}
            />

            <div className={s.sidebar_mobile__content__logo_text}>
              Кава
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
