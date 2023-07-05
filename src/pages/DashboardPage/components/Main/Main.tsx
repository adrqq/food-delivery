/* eslint-disable max-len */
import s from './Main.module.scss';
import { BurgerMenuButton } from '../../../../UI/BurgerMenuButton';
// import { Example } from '../../../../hooks';

export const Main = () => {
  // const { is918 } = Example();

  return (
    <div className={s.dashboard__stats}>
      <header className={s.dashboard__stats__header}>
        <div className={s.dashboard__stats__header__info}>
          <h1 className={s.dashboard__stats__header__info__title}>Dashboard</h1>
          <p className={s.dashboard__stats__header__info__time}>
            {new Date().toLocaleString()}
          </p>
        </div>

        <div className={s.dashboard__stats__header__button}>
          <BurgerMenuButton />
        </div>
      </header>

      <div className={s.container}>
        <section className={s.dashboard__stats__info}>
          <div className={s.dashboard__stats__info__item}>
            <div className={s.dashboard__stats__info__item__percent}>
              <div className={s.dashboard__stats__info__item__percent__logo}>
                <div
                  className={
                    s.dashboard__stats__info__item__percent__logo__dollar
                  }
                />
              </div>
              <p className={s.dashboard__stats__info__item__percent__value}>
                32.40%
              </p>
              <div
                className={s.dashboard__stats__info__item__percent__direction}
              >
                <div
                  className={`${s.dashboard__stats__info__item__percent__direction__arrow} ${s.dashboard__stats__info__item__percent__direction__arrow_up}`}
                />
              </div>
            </div>
            <p className={s.dashboard__stats__info__item__total}>$10,243</p>
            <h2 className={s.dashboard__stats__info__item__title}>
              Total revenue
            </h2>
          </div>

          <div className={s.dashboard__stats__info__item}>
            <div className={s.dashboard__stats__info__item__percent}>
              <div className={s.dashboard__stats__info__item__percent__logo}>
                <div
                  className={
                    s.dashboard__stats__info__item__percent__logo__increasing__trend
                  }
                />
              </div>
              <p className={s.dashboard__stats__info__item__percent__value}>
                32.40%
              </p>
              <div
                className={s.dashboard__stats__info__item__percent__direction}
              >
                <div
                  className={`${s.dashboard__stats__info__item__percent__direction__arrow} ${s.dashboard__stats__info__item__percent__direction__arrow_up}`}
                />
              </div>
            </div>
            <p className={s.dashboard__stats__info__item__total}>+500$</p>
            <h2 className={s.dashboard__stats__info__item__title}>
              Mounts revenue
            </h2>
          </div>

          <div className={s.dashboard__stats__info__item}>
            <div className={s.dashboard__stats__info__item__percent}>
              <div className={s.dashboard__stats__info__item__percent__logo}>
                <div
                  className={
                    s.dashboard__stats__info__item__percent__logo__bookmark
                  }
                />
              </div>
              <p className={s.dashboard__stats__info__item__percent__value}>
                32.40%
              </p>
              <div
                className={`${s.dashboard__stats__info__item__percent__direction} ${s.dashboard__stats__info__item__percent__direction_down}`}
              >
                <div
                  className={`${s.dashboard__stats__info__item__percent__direction__arrow} ${s.dashboard__stats__info__item__percent__direction__arrow_down}`}
                />
              </div>
            </div>
            <p className={s.dashboard__stats__info__item__total}>23,456</p>
            <h2 className={s.dashboard__stats__info__item__title}>
              Total Dish Ordered
            </h2>
          </div>

          <div className={s.dashboard__stats__info__item}>
            <div className={s.dashboard__stats__info__item__percent}>
              <div className={s.dashboard__stats__info__item__percent__logo}>
                <div
                  className={
                    s.dashboard__stats__info__item__percent__logo__people
                  }
                />
              </div>
              <p className={s.dashboard__stats__info__item__percent__value}>
                32.40%
              </p>
              <div
                className={s.dashboard__stats__info__item__percent__direction}
              >
                <div
                  className={`${s.dashboard__stats__info__item__percent__direction__arrow} ${s.dashboard__stats__info__item__percent__direction__arrow_up}`}
                />
              </div>
            </div>
            <p className={s.dashboard__stats__info__item__total}>1,092</p>
            <h2 className={s.dashboard__stats__info__item__title}>
              Total customers
            </h2>
          </div>
        </section>

        <section className={s.dashboard__order_report}>
          <div className={s.dashboard__order_report_wrapper}>
            <div className={s.dashboard__order_report__header}>
              <h2 className={s.dashboard__order_report__header__title}>
                Order Report
              </h2>
              <div
                className={
                  s.dashboard__order_report__header__filter_order_wrapper
                }
              >
                <select
                  className={s.dashboard__order_report__header__filter_order}
                // className={s.menu__select}
                >
                  <option value="1">Newest</option>
                  <option value="2">Oldest</option>
                </select>
              </div>
            </div>

            <div className={s.dashboard__container}>
              <div className={s.dashboard__table__fixed}>
                <table className={s.dashboard__table}>
                  <thead className={s.dashboard__table__head}>
                    <tr className={s.dashboard__table__head__row}>
                      <th className={s.dashboard__table__head__row__item}>
                        Customer
                      </th>
                      <th className={s.dashboard__table__head__row__item}>
                        Menu
                      </th>
                      <th className={s.dashboard__table__head__row__item}>
                        Total Payment
                      </th>
                      <th className={s.dashboard__table__head__row__item}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td
                        className={`${s.dashboard__table__body__row__item} ${s.dashboard__table__body__row__item_first}`}
                      >
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className={s.dashboard__table__body}>
                    <tr className={s.dashboard__table__body__row}>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__wrapper}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__avatar
                            }
                          >
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="avatar"
                              className={
                                s.dashboard__table__body__row__item__avatar__img
                              }
                            />
                          </div>
                          <p
                            className={s.dashboard__table__body__row__item__name}
                          >
                            John Doe
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__menu}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__menu__name
                            }
                          >
                            Chicken Burger
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__payment}
                        >
                          <p
                            className={
                              s.dashboard__table__body__row__item__payment__total
                            }
                          >
                            $10,243.00
                          </p>
                        </div>
                      </td>
                      <td className={s.dashboard__table__body__row__item}>
                        <div
                          className={s.dashboard__table__body__row__item__status}
                        >
                          <div
                            className={
                              s.dashboard__table__body__row__item__status__circle
                            }
                          >
                            <p
                              className={
                                s.dashboard__table__body__row__item__status__circle__text
                              }
                            >
                              Completed
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
