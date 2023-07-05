/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import s from './SelectorBar.module.scss';

enum SelectedPage {
  ProductsManagement,
  Notifications,
  Security,
  AboutUs,
}

export const SelectorBar = () => {
  const [active, setActive] = useState<SelectedPage>(SelectedPage.Security);

  const handlePageChange = (nameOfPage: SelectedPage) => {
    setActive(nameOfPage);
  };

  return (
    <div className={s.selector__bar}>
      <NavLink to="products-management">
        <button
          className={classNames(
            s.selector__bar__item,
            { [s.selector__bar__item__selected]: active === SelectedPage.ProductsManagement },
          )}
          type="button"
          onClick={() => handlePageChange(SelectedPage.ProductsManagement)}
        >
          <div className={s.selector__bar__item__selected__wrapper}>
            <div className={classNames(
              s.selector__bar__item__logo,
              {
                [s.selector__bar__item__selected__logo_discount]: active === SelectedPage.ProductsManagement,
                [s.selector__bar__item__logo_discount]: active !== SelectedPage.ProductsManagement,
              },
            )}
            />

            <div className={s.selector__bar__item__selected__info}>
              <div className={classNames(
                s.selector__bar__item__info__title,
                { [s.selector__bar__item__selected__info__title]: active === SelectedPage.ProductsManagement },
              )}
              >
                Управління продуктами
              </div>

              <div className={s.selector__bar__item__selected__info__subtitle}>
                Додавайте, редагуйте та видаляйте продукти
              </div>
            </div>
          </div>
        </button>
      </NavLink>

      <NavLink to="notifications">
        <button
          className={classNames(
            s.selector__bar__item,
            { [s.selector__bar__item__selected]: active === SelectedPage.Notifications },
          )}
          type="button"
          onClick={() => handlePageChange(SelectedPage.Notifications)}
        >
          <div className={s.selector__bar__item__wrapper}>
            <div className={classNames(
              s.selector__bar__item__logo,

              {
                [s.selector__bar__item__selected__logo_notification]: active === SelectedPage.Notifications,
                [s.selector__bar__item__logo_notification]: active !== SelectedPage.Notifications,
              },
            )}
            />

            <div className={s.selector__bar__item__info}>
              <div className={classNames(
                s.selector__bar__item__info__title,
                { [s.selector__bar__item__selected__info__title]: active === SelectedPage.Notifications },
              )}
              >
                Сповіщення
              </div>

              <div className={s.selector__bar__item__info__subtitle}>
                Налаштуйте сповіщення
              </div>
            </div>
          </div>
        </button>
      </NavLink>

      <NavLink to="security">
        <button
          className={classNames(
            s.selector__bar__item,
            { [s.selector__bar__item__selected]: active === SelectedPage.Security },
          )}
          type="button"
          onClick={() => handlePageChange(SelectedPage.Security)}
        >
          <div className={s.selector__bar__item__wrapper}>
            <div className={classNames(
              s.selector__bar__item__logo,
              {
                [s.selector__bar__item__selected__logo_security]: active === SelectedPage.Security,
                [s.selector__bar__item__logo_security]: active !== SelectedPage.Security,
              },
            )}
            />

            <div className={s.selector__bar__item__info}>
              <div className={classNames(
                s.selector__bar__item__info__title,
                { [s.selector__bar__item__selected__info__title]: active === SelectedPage.Security },
              )}
              >
                Безпека
              </div>

              <div className={s.selector__bar__item__info__subtitle}>
                Налаштуйте безпеку пароль та інше
              </div>
            </div>
          </div>
        </button>
      </NavLink>

      <NavLink to="about-us">
        <button
          className={classNames(
            s.selector__bar__item,
            { [s.selector__bar__item__selected]: active === SelectedPage.AboutUs },
          )}
          type="button"
          onClick={() => handlePageChange(SelectedPage.AboutUs)}
        >
          <div className={s.selector__bar__item__wrapper}>
            <div className={classNames(
              s.selector__bar__item__logo,

              {
                [s.selector__bar__item__selected__logo_warning]: active === SelectedPage.AboutUs,
                [s.selector__bar__item__logo_warning]: active !== SelectedPage.AboutUs,
              },
            )}
            />

            <div className={s.selector__bar__item__info}>
              <div className={classNames(
                s.selector__bar__item__info__title,
                { [s.selector__bar__item__selected__info__title]: active === SelectedPage.AboutUs },
              )}
              >
                Про нас
              </div>

              <div className={s.selector__bar__item__info__subtitle}>
                Дізнайтеся більше про нас
              </div>
            </div>
          </div>
        </button>
      </NavLink>
    </div>
  );
};
