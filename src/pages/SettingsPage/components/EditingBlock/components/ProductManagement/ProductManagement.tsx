/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Example } from '../../../../../../hooks';
import s from './ProductManagement.module.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/scrollbar';

import { ProductCategory } from '../../../../../../types/products';
import { setFilter } from '../../../../../../features/products/productsSlice';
import { setPagePath } from '../../../../../../features/main/mainSlice';
import { PagePath } from '../../../../../../types/PagePath';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { ProductManagementItem } from './components/ProductManagementItem';
import { ProductDeleteModal } from '../../../../../../modals/ProductDeleteModal';

export const ProductManagement = () => {
  const { isMobile } = Example();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const pagePath = useAppSelector((state) => state.main.pagePath);
  const products = useAppSelector((state) => state.products.products);
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);

  const handleCreateProductClick = () => {
    navigate(PagePath.SETTINGS__MANAGEMENT__CREATE);
  };

  const handleFilterChange = (filter: ProductCategory) => {
    dispatch(setFilter(filter));
  };

  useEffect(() => {
    dispatch(setPagePath(PagePath.SETTINGS__MANAGEMENT));
  }, []);

  return (
    <div className={s.block}>
      <header className={s.editing__block__header}>
        <div className={s.editing__block__header__info}>
          <div className={s.editing__block__header__info__title}>
            Products Management
          </div>

          <div
            className={s.editing__block__header__info__selector__wrapper}
          >
            <select
              className={s.editing__block__header__info__selector}
            >
              <option value="1">Newest</option>
              <option value="2">Oldest</option>
            </select>
          </div>
        </div>

        <nav className={s.editing__block__nav}>
          <ul className={s.header__nav__list}>
            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.ALL && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.ALL)}
              >
                Всі страви
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.GRILL && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.GRILL)}
              >
                Гриль
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.SOUPS && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.SOUPS)}
              >
                Супи
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.SALADS && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.SALADS)}
              >
                Салати
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.HOT_DISHES && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.HOT_DISHES)}
              >
                Гарячі
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.DRINKS && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.DRINKS)}
              >
                Напої
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.COLD_DISHES && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.COLD_DISHES)}
              >
                Закуски
              </button>
            </li>

            <li className={s.header__nav__item}>
              <button
                type="button"
                className={classNames(
                  s.header__nav__item__button,
                  [selectedFilter === ProductCategory.DESSERTS && s.header__nav__item__button__active],
                )}
                onClick={() => handleFilterChange(ProductCategory.DESSERTS)}
              >
                Десерти
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className={s.editing__block__main}>
        <div className={s.editing__block__main__container}>
          <button
            type="button"
            className={classNames(
              s.editing__block__main__new__item,
              [products.length === 0 && s.editing__block__main__new__item__empty],
            )}
            onClick={handleCreateProductClick}
          >
            <div className={s.editing__block__main__new__item__wrapper}>
              <div
                className={s.editing__block__main__new__item__button}
              >
                <div className={s.editing__block__main__new__item__button__icon} />
              </div>

              <div className={s.editing__block__main__new__item__text}>
                Додати новий продукт
              </div>
            </div>
          </button>

          {products.map((product) => (
            <ProductManagementItem
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className={s.editing__block__main__buttons}>
          <button
            type="button"
            className={`${s.editing__block__main__buttons__button} ${s.editing__block__main__buttons__button__discard}`}
          >
            <div className={s.editing__block__main__buttons__button__discard__text}>
              Відмінити зміни
            </div>
          </button>

          <button
            type="button"
            className={`${s.editing__block__main__buttons__button} ${s.editing__block__main__buttons__button__save}`}
          >
            <div className={s.editing__block__main__buttons__button__save__text}>
              Зберегти зміни
            </div>
          </button>
        </div>
      </main>

    </div>
  );
};
