/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { Audio } from 'react-loader-spinner';

import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../../../components/ProductCard';
import { Pagination } from '../../../../components/Pagination';
import s from './Menu.module.scss';
// import { useMatchMedia } from '../../../../hooks';
import { getProductsChunk } from '../../../../api/products';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
  setItemsPerPage,
  setCurrentPage,
  getProductsStart,
  getProductsFailure,
  getProductsSuccess,
  setIsProductsLoading,
} from '../../../../features/products/productsSlice';
import { ProductModel } from '../../../../models/ProductModel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ErrorType, ProductCategory } from '../../../../types/products';

type Props = {
  isOrderMenuOpen: boolean,
};

enum SortType {
  ASC = 'За зростанням ціни',
  DESC = 'За спаданням ціни',
  LIKES_COUNT = 'За популярністю',
}

export const Menu: React.FC<Props> = ({ isOrderMenuOpen }) => {
  // const { isMobile } = useMatchMedia();
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();

  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  const productsLength = useAppSelector((state) => state.products.productsLength);
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);
  const isProductsLoading = useAppSelector((state) => state.products.isProductsLoading);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const images = useAppSelector((state) => state.products.images);
  const error = useAppSelector((state) => state.products.error);

  // console.log('error', error);

  const [sortType, setSortType] = useState(SortType.ASC);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);

  const handleOpenTimeSelector = () => {
    setIsTimeSelectorOpen(!isTimeSelectorOpen);
  };

  // useEffect(() => {
  //   dispatch(setIsProductsLoading(true));

  //   const intervalId = setInterval(async () => {
  //     console.log('images.length', images.length);
  //     console.log('products.length', products.length);

  //     if (images.length >= products.length) {
  //       dispatch(setIsProductsLoading(false));
  //       clearInterval(intervalId);
  //     }
  //   }, 200);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // useEffect(() => {
  //   while (images.length < products.length) {
  //     dispatch(setIsProductsLoading(true));
  //   }

  //   if (images.length >= products.length) {
  //     dispatch(setIsProductsLoading(false));
  //   }
  // }, [images.length]);

  const calculateTitleText = () => {
    switch (selectedFilter) {
      case ProductCategory.ALL:
        return 'Усі страви';

      case ProductCategory.GRILL:
        return 'Гриль';

      case ProductCategory.SOUPS:
        return 'Супи';

      case ProductCategory.HOT_DISHES:
        return 'Гарячі страви';

      case ProductCategory.COLD_DISHES:
        return 'Закуски';

      case ProductCategory.DRINKS:
        return 'Напої';

      case ProductCategory.DESSERTS:
        return 'Десерти';

      default:
        return 'Усі страви';
    }
  };

  return (
    <main className={s.menu__container}>

      <div>
        <div className={s.menu__functional}>
          <h1 className={s.menu__functional__text}>
            {calculateTitleText()}
          </h1>

          <div className={s.menu__selector__wrapper}>
            <p className={s.menu__selector__description}>
              сортувати за
            </p>

            <div className={s.menu__selector__searchbox}>
              <div className={s.select__wrapper}>
                <button
                  type="button"
                  className={classNames(
                    s.menu__selector__searchbox__select__menu,
                    // [timeChoose === SelectedTime.CHOOSE_TIME && s.select__searchbox],
                    s.select__searchbox,
                  )}
                  onClick={handleOpenTimeSelector}
                >
                  <div
                    className={classNames(
                      s.menu__selector__searchbox__select__btn,
                      [isTimeSelectorOpen && s.menu__selector__searchbox__select__btn__active],
                    )}
                  >
                    <p className={s.menu__selector__searchbox__select__sBtn__text}>
                      {sortType}
                    </p>
                    <div
                      className={classNames(
                        s.menu__selector__searchbox__select__icon,
                        [isTimeSelectorOpen && s.menu__selector__searchbox__select__icon__active],
                      )}
                    />
                  </div>

                  {isTimeSelectorOpen && (
                    <ul className={s.menu__selector__searchbox__select__options}>
                      <button
                        type="button"
                        className={classNames(
                          s.menu__selector__searchbox__select__options__option,
                          s.menu__selector__searchbox__select__options__option__as_soon,
                        )}
                        onClick={() => (setSortType(SortType.ASC))}
                      >
                        <div
                          className={classNames(
                            s.menu__selector__searchbox__select__options__option__card_icon,
                            s.menu__selector__searchbox__select__options__option__card_icon__timer,
                            [sortType === SortType.ASC && s.menu__selector__searchbox__select__options__option__card_icon__timer__active],
                          )}
                        />
                        <p
                          className={classNames(
                            s.menu__selector__searchbox__select__options__option__text,
                            [sortType === SortType.ASC && s.menu__selector__searchbox__select__options__option__text__active],
                          )}
                        >
                          {SortType.ASC}
                        </p>
                      </button>

                      <button
                        type="button"
                        className={s.menu__selector__searchbox__select__options__option}
                        onClick={() => (setSortType(SortType.DESC))}
                      >
                        <div
                          className={classNames(
                            s.menu__selector__searchbox__select__options__option__card_icon,
                            s.menu__selector__searchbox__select__options__option__card_icon__clock,
                            [sortType === SortType.DESC && s.menu__selector__searchbox__select__options__option__card_icon__clock__active],
                          )}
                        />
                        <p
                          className={classNames(
                            s.menu__selector__searchbox__select__options__option__text,
                            [sortType === SortType.DESC && s.menu__selector__searchbox__select__options__option__text__active],
                          )}
                        >
                          {SortType.DESC}
                        </p>
                      </button>

                      <button
                        type="button"
                        className={s.menu__selector__searchbox__select__options__option}
                        onClick={() => (setSortType(SortType.LIKES_COUNT))}
                      >
                        <div
                          className={classNames(
                            s.menu__selector__searchbox__select__options__option__card_icon,
                            s.menu__selector__searchbox__select__options__option__card_icon__stats,
                            [sortType === SortType.LIKES_COUNT && s.menu__selector__searchbox__select__options__option__card_icon__stats__active],
                          )}
                        />
                        <p
                          className={classNames(
                            s.menu__selector__searchbox__select__options__option__text,
                            [sortType === SortType.LIKES_COUNT && s.menu__selector__searchbox__select__options__option__text__active],
                          )}
                        >
                          {SortType.LIKES_COUNT}
                        </p>
                      </button>
                    </ul>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <nav className={s.menu__slider__container}>
          <ul className={s.menu__slider}>
            <button type="button">
              Усі страви
            </button>

            <button type="button">
              Піца
            </button>

            <button type="button">
              Бургери
            </button>
          </ul>
        </nav> */}
      </div>

      {isProductsLoading ? (
        <div className={s.loader__wrapper}>
          <Audio
            color="#EA7C69"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <>
          {
            !error.includes(ErrorType.SERVER_ERROR) ? (
              <>
                {
                  products.length > 0 ? (
                    <>
                      <div className={classNames(
                        s.menu__portfolio,
                      )}
                      >
                        {products.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                          />
                        ))}
                      </div>
                      <Pagination />
                    </>
                  ) : (
                    <div className={s.menu__message}>
                      <h1 className={s.menu__message__title}>
                        От лихо тут наче пустеля.
                      </h1>
                      <p className={s.menu__message__text}>
                        В цій категорії поки немає товарів.
                      </p>
                    </div>
                  )
                }
              </>
            ) : (
              <div className={s.menu__message}>
                <h1 className={s.menu__message__title}>
                  Приносимо вибачення.
                </h1>
                <p className={s.menu__message__text}>
                  На сервері виникла помилка або він тимчасово недоступний. Спробуйте пізніше.
                </p>
              </div>
            )
          }
        </>
      )}
    </main>
  );
};
