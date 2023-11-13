/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { Audio } from 'react-loader-spinner';

import { useEffect, useState } from 'react';
import { ProductCard } from '../../../../components/ProductCard';
import { Pagination } from '../../../../components/Pagination';
import s from './Menu.module.scss';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
  setItemsPerPage,
  setSortType as setSortTypeAction,
} from '../../../../features/products/productsSlice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ErrorType, ProductCategory } from '../../../../types/Products';
import { SortType } from '../../../../types/SortType';
import { FilterSelect } from '../../../../components/FilterSelect';

type Props = {
  isOrderMenuOpen: boolean,
};

export const Menu: React.FC<Props> = ({ isOrderMenuOpen }) => {
  const dispatch = useAppDispatch();

  const {
    products,
    selectedFilter,
    isProductsLoading,
    error,
    itemsPerPage,
    sortType,
  } = useAppSelector((state) => state.products);

  const handlePerPageChange = (value: string) => {
    dispatch(setItemsPerPage(Number(value)));
  };

  const handleSortTypeChange = (value: SortType) => {
    dispatch(setSortTypeAction(value));
  };

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
    <main className={s.menu}>
      <div>
        <div className={s.menu__functional}>
          <h1 className={s.menu__functional__text}>
            {calculateTitleText()}
          </h1>

          <div className={s.menu__functional__selectors}>
            <div className={s.select_wrapper}>
              <FilterSelect
                title="Кількість"
                options={['6', '12', '24']}
                selectedOption={String(itemsPerPage)}
                setSelectedOption={handlePerPageChange}
                width="60px"
              />
            </div>

            <div className={s.select_wrapper}>
              <FilterSelect
                title="Сортувати за"
                options={[SortType.PRICE_ASC, SortType.PRICE_DESC, SortType.WEIGHT_ASC, SortType.WEIGHT_DESC, SortType.LIKES_COUNT]}
                selectedOption={String(sortType)}
                setSelectedOption={handleSortTypeChange}
                width="140px"
              />
            </div>
          </div>
        </div>
      </div>

      {
        isProductsLoading ? (
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
                      <div className={s.menu__contents}>
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

                        <div className={s.menu__pagination}>
                          <Pagination />
                        </div>
                      </div>
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
        )
      }
    </main>
  );
};
