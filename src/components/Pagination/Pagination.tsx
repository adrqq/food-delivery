/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React from 'react';
import s from './Pagination.module.scss';

import arrowImg from '../../images/logos/arrow-left-orange.svg';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setCurrentPage,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
} from '../../features/products/productsSlice';
import { getProductsChunk } from '../../api/products';
import { ErrorType } from '../../types/Products';
import { ProductModel } from '../../models/ProductModel';

import { getAndSetProducts } from '../../utils/functions/getAndSetProducts';

function getButtons(start: number, finish: number): number[] {
  const numbers = [];

  for (let i = start; i <= finish; i += 1) {
    numbers.push(i);
  }

  return numbers;
}

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  // const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);
  // const currentPage = useAppSelector((state) => state.products.currentPage);
  // const productsLength = useAppSelector((state) => state.products.productsLength);
  // const selectedFilter = useAppSelector((state) => state.products.selectedFilter);
  // const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const {
    itemsPerPage,
    currentPage,
    productsLength,
    selectedFilter,
    searchQuery,
    sortType,
  } = useAppSelector((state) => state.products);

  const totalPages = Math.ceil(productsLength / itemsPerPage);

  const handlePageNumberClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextPage = +(event.currentTarget.dataset.page || 0);

    if (
      nextPage === currentPage || nextPage < 1 || nextPage > totalPages
    ) {
      return;
    }

    dispatch(setCurrentPage(nextPage));

    getAndSetProducts(
      dispatch,
      nextPage,
      itemsPerPage,
      selectedFilter,
      searchQuery,
      sortType,
    );

    console.log('nextPage', nextPage);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {totalPages > 1 && (
        <div className={s.pagination}>
          <ul className={s.pagination}>
            <li
              className={classNames(
                s.pagination__list,
                {
                  [s.pagination__disabled]: currentPage === 1,
                },
              )}
            >
              <button
                type="button"
                className={classNames(
                  s.pagination__button,
                  s.pagination__button_left_right,
                )}
                disabled={currentPage === 1}
              >
                <a
                  data-cy="prevLink"
                  className={classNames(
                    s.pagination__link,
                    s.pagination__link_left_right,
                    {
                      [s.pagination_disabled]: currentPage === 1,
                    },
                  )}
                  aria-disabled={currentPage === 1}
                  data-page={currentPage - 1}
                  onClick={handlePageNumberClick}
                >
                  <img className={s.arrow__left} src={arrowImg} alt="arrowImg" />
                </a>
              </button>

            </li>
            {
              getButtons(1, totalPages)
                .map(page => (
                  <li
                    className={s.pagination__list}
                    key={page}
                  >
                    <button
                      type="button"
                      className={s.pagination__button}
                    >
                      <a
                        data-cy="pageLink"
                        className={classNames(
                          s.pagination__link,
                          {
                            [s.pagination__active]: page === currentPage,
                          },
                        )}
                        href={`#${page}`}
                        data-page={page}
                        onClick={handlePageNumberClick}
                      >
                        {`   ${page}   `}
                      </a>
                    </button>

                  </li>
                ))
            }
            <li
              className={classNames(
                s.pagination__list,
                {
                  [s.pagination__disabled]: currentPage === totalPages,
                },
              )}
            >
              <button
                type="button"
                className={classNames(
                  s.pagination__button,
                  s.pagination__button_left_right,
                )}
              >
                <a
                  className={classNames(
                    s.pagination__link,
                    s.pagination__link_left_right,
                  )}
                  aria-disabled={currentPage === totalPages}
                  data-page={currentPage + 1}
                  onClick={handlePageNumberClick}
                >
                  <img className={s.arrow__right} src={arrowImg} alt="arrowImg" />
                </a>
              </button>

            </li>
          </ul>
        </div>
      )}
    </>
  );
};
