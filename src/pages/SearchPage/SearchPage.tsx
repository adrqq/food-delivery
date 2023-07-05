/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Audio } from 'react-loader-spinner';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ProductCardOrder } from '../../components/ProductCardOrder';
import s from './SearchPage.module.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProductsChunk, getProductsLength } from '../../api/products';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  setSearchQuery,
  setProductsLength,
  setErrorText,
} from '../../features/products/productsSlice';
import { ErrorType } from '../../types/products';
import { ProductModel } from '../../models/ProductModel';

export const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector((state) => state.products.products);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const isProductsLoading = useAppSelector((state) => state.products.isProductsLoading);
  const selectedFilter = useAppSelector((state) => state.products.selectedFilter);
  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  const currentPage = useAppSelector((state) => state.products.currentPage);

  useEffect(() => {
    return () => {
      dispatch(getProductsStart());

      getProductsChunk(currentPage, itemsPerPage, selectedFilter, searchQuery).then((data: ProductModel[]) => {
        dispatch(getProductsSuccess(data));

        console.log(data);
      })
        .catch(() => {
          dispatch(getProductsFailure(ErrorType.SERVER_ERROR));
        });

      getProductsLength(selectedFilter, searchQuery).then((data: number) => {
        console.log('length', data);

        dispatch(setProductsLength(data));
      })
        .catch(() => {
          dispatch(setErrorText('Can not get products length'));
        });

      dispatch(setSearchQuery(''));
    };
  }, []);

  const handleMobileSearch = (searchValue: string) => {
    console.log(searchValue);

    dispatch(setSearchQuery(searchValue));

    dispatch(getProductsStart());

    getProductsChunk(1, itemsPerPage, selectedFilter, searchValue).then((data: ProductModel[]) => {
      dispatch(getProductsSuccess(data));

      console.log(data);
    })
      .catch(() => {
        dispatch(getProductsFailure(ErrorType.SERVER_ERROR));
      });

    getProductsLength(selectedFilter, searchValue).then((data: number) => {
      console.log('length', data);

      dispatch(setProductsLength(data));
    })
      .catch(() => {
        dispatch(setErrorText('Can not get products length'));
      });
  };

  const handleMobileSearchClose = () => {
    dispatch(setSearchQuery(''));

    navigate('/home', { replace: true });
  };

  return (
    <div className={s.search_page}>
      <div className={s.search_page__header}>
        <button
          type="button"
          className={s.search_page__header__button_back}
          onClick={handleMobileSearchClose}
        />
        <h1 className={s.search_page__header__title}>
          Search by menu
        </h1>
      </div>

      <div className={s.search_page__search}>
        <input
          type="text"
          className={s.search_page__search__input}
          placeholder="Search for food, coffee, etc.."
          value={searchQuery}
          onChange={(event) => {
            handleMobileSearch(event.target.value);
          }}
        />
      </div>

      <div className={s.search_page__content}>
        {searchQuery && (
          <>
            {isProductsLoading ? (
              <div className={s.loader__wrapper}>
                <Audio
                  color="#EA7C69"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              products.map((product) => (
                <ProductCardOrder key={product.id} product={product} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};
