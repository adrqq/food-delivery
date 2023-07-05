/* eslint-disable max-len */
import s from './PageInfo.module.scss';
import { Example } from '../../../../hooks';

export const PageInfo = () => {
  const { maxHight } = Example();

  return (
    <div className={s.info}>
      <div className={s.order__info}>
        <div className={s.order__info__header}>
          <div className={s.order__info__header__title}>
            Most Ordered
          </div>

          <div className={s.order__info__header__select__wrapper}>
            <select
              name="food"
              id="food-select"
              className={s.order__info__header__select}
            >
              <option selected disabled> Today </option>
              <option value="dog">Hot Dishes</option>
              <option value="cat">Cold Dishes</option>
              <option value="dog">Drinks</option>
              <option value="cat">Deserts</option>
              <option value="cat">Salads</option>
              <option value="cat">Soups</option>
            </select>
          </div>
        </div>

        <div className={s.order__info__main}>
          <div className={s.order__info__main__wrapper}>
            {maxHight && (
              <div className={s.item__information}>
                <div className={s.item__information__left}>
                  <div className={s.item__information__left__image} />
                  <div className={s.item__information__left__description}>
                    <div className={s.item__information__left__description__title}>
                      Spicy seasoned seafood noodles
                    </div>
                    <div className={s.item__information__left__description__price}>
                      200 dishes ordered
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={s.item__information}>
              <div className={s.item__information__left}>
                <div className={s.item__information__left__image} />
                <div className={s.item__information__left__description}>
                  <div className={s.item__information__left__description__title}>
                    Spicy seasoned seafood noodles
                  </div>
                  <div className={s.item__information__left__description__price}>
                    200 dishes ordered
                  </div>
                </div>
              </div>
            </div>

            <div className={s.item__information}>
              <div className={s.item__information__left}>
                <div className={s.item__information__left__image} />
                <div className={s.item__information__left__description}>
                  <div className={s.item__information__left__description__title}>
                    Spicy seasoned seafood noodles
                  </div>
                  <div className={s.item__information__left__description__price}>
                    200 dishes ordered
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button
            className={s.order__info__main__button}
            type="button"
          >
            View All
          </button>
        </div>
      </div>

      <div className={s.global__info}>
        <div className={s.global__info__wrapper}>
          <div className={s.global__info__header}>
            <div className={s.global__info__header__title}>
              Most Type of Order
            </div>

            <div className={s.global__info__header__select__wrapper}>
              <select
                name="food"
                id="food-select"
                className={s.global__info__header__select}
              >
                <option selected> Today </option>
                <option value="all-day"> all-day </option>
              </select>
            </div>
          </div>

          <div className={s.global__info__main}>
            <div className={s.global__info__main__wrapper}>
              <div className={s.global__info__main__graph} />

              <div className={s.global__info__main__info}>
                <div className={s.global__info__main__info__wrapper}>
                  <div className={`${s.global__info__main__info__circle} ${s.global__info__main__info__circle__pink}`} />

                  <div className={s.global__info__main__info__text}>
                    <div className={s.global__info__main__info__text__title}>
                      Dine In
                    </div>

                    <div className={s.global__info__main__info__text__description}>
                      200 customers
                    </div>
                  </div>
                </div>

                <div className={s.global__info__main__info__wrapper}>
                  <div className={`${s.global__info__main__info__circle} ${s.global__info__main__info__circle__yellow}`} />

                  <div className={s.global__info__main__info__text}>
                    <div className={s.global__info__main__info__text__title}>
                      Dine In
                    </div>

                    <div className={s.global__info__main__info__text__description}>
                      200 customers
                    </div>
                  </div>
                </div>

                <div className={s.global__info__main__info__wrapper}>
                  <div className={`${s.global__info__main__info__circle} ${s.global__info__main__info__circle__blue}`} />

                  <div className={s.global__info__main__info__text}>
                    <div className={s.global__info__main__info__text__title}>
                      Dine In
                    </div>

                    <div className={s.global__info__main__info__text__description}>
                      200 customers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
