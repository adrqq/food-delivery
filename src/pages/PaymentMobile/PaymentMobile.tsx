/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
// import PhoneInput from 'react-phone-number-input';
import s from './PaymentMobile.module.scss';
import deliveryLogo from '../../images/logos/delivery-logo.svg';
import ukraineIcon from '../../images/logos/flag-of-ukraine.png';
import { PaymentItem } from './components/PaymentItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

enum SelectedMethod {
  CARD = 'Card',
  CASH = 'Cash',
  SELECT = 'SELECT',
}

enum SelectedTime {
  AS_SOON = 'AsSoon',
  CHOOSE_TIME = 'ChooseTime',
}

export const PaymentMobile: React.FC = () => {
  const [paymentChoose, setPaymentChoose] = useState<SelectedMethod>(SelectedMethod.SELECT);
  const [selectOpener, setSelectOpener] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [timeChoose, setTimeChoose] = useState<SelectedTime>(SelectedTime.AS_SOON);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const [numberValue, setNumberValue] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    isUserAuth,
    user,
  } = useAppSelector(state => state.users);

  const {
    localStorageCart,
    userCart,
    cartItemsCount,
    cartTotalPrice,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectPayment = (nameOfPayment: SelectedMethod) => {
    if (nameOfPayment === SelectedMethod.CARD) {
      setPaymentChoose(SelectedMethod.CARD);
    }

    if (nameOfPayment === SelectedMethod.CASH) {
      setPaymentChoose(SelectedMethod.CASH);
    }
  };

  const handleButtonOpener = () => {
    setSelectOpener(!selectOpener);
  };

  const handlePaymentClose = () => {
    navigate(-1);
  };

  const handleOpenOptions = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };

  const handleOpenTimeSelector = () => {
    setIsTimeSelectorOpen(!isTimeSelectorOpen);
  };

  return (
    <div className={s.payment__mobile}>
      <header className={s.payment__mobile__header}>
        <button
          type="button"
          className={s.payment__mobile__header__back}
          onClick={handlePaymentClose}
        >
          <div className={s.payment__mobile__header__back__image} />
        </button>

        <div className={s.payment__mobile__header__text}>
          <p className={s.payment__mobile__header__text__main}>Підтвердити замовлення</p>

          <p className={s.payment__mobile__header__text__second}> (Доставка) </p>
        </div>

      </header>

      <main className={s.payment__mobile__main__container}>
        <div className={s.payment__mobile__main__order__info}>
          <div className={s.payment__mobile__main__order__info__wrapper}>
            <p className={s.payment__mobile__main__order__info__text}>
              Ваше замовлення
            </p>
            <div className={classNames(
              s.payment__mobile__main__order__info__button,
              { [s.payment__mobile__main__order__info__button__active]: selectOpener },
            )}
            >
              <button
                type="button"
                className={`${s.payment__mobile__main__order__info__button__closed__obj}`}
                onClick={handleButtonOpener}
              >
                <div className={s.payment__mobile__main__order__info__button__wrapper__closed}>
                  <div className={s.payment__mobile__main__order__info__button__logo__closed} />
                  <div className={s.payment__mobile__main__order__info__button__text__closed}>
                    {`${cartItemsCount} товарів на суму ${cartTotalPrice} грн`}
                  </div>
                </div>

                <div className={classNames(
                  s.payment__mobile__main__order__info__button__selector__icon,
                  [selectOpener && s.payment__mobile__main__order__info__button__selector__icon__active],
                )}
                />
              </button>

              {selectOpener && (
                <div className={s.payment__mobile__main__order__info__button__list}>
                  {isUserAuth ? (
                    <>
                      {userCart.map((item, index) => (
                        <PaymentItem
                          key={item.id}
                          product={item}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {localStorageCart.map((item, index) => (
                        <PaymentItem
                          key={item.id}
                          product={item}
                        />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={s.payment__mobile__main__order__delivery}>
            <p className={s.payment__mobile__main__order__delivery__text}>
              Спосіб доставки
            </p>

            <div className={s.payment__mobile__main__order__delivery__button}>
              <img
                src={deliveryLogo}
                alt="bicycle"
                className={s.payment__mobile__main__order__delivery__button__img}
              />
              <p className={s.payment__mobile__main__order__delivery__button__text}>
                Доставка
              </p>
            </div>
          </div>

          <div className={s.payment__mobile__main__order__address}>
            <h1 className={s.payment__mobile__main__order__address__text}>
              Адреса доставки
            </h1>

            <div className={s.payment__mobile__main__order__address__container}>
              <div className={s.payment__mobile__main__order__address__searchbox}>
                <p className={s.payment__mobile__main__order__address__searchbox__text}>
                  Адреса та номер будинку
                </p>

                <input
                  type="text"
                  className={s.payment__mobile__main__order__address__searchbox__input}
                  maxLength={50}
                />
              </div>

              <div className={s.payment__mobile__main__order__address__searchbox}>
                <p className={s.payment__mobile__main__order__address__searchbox__text}>
                  Підїзд / поверх / номер квартири / інше
                </p>

                <input
                  type="text"
                  className={s.payment__mobile__main__order__address__searchbox__input__specification}
                  maxLength={50}
                />
              </div>

              <div className={s.payment__mobile__main__order__address__searchbox}>
                <p className={s.payment__mobile__main__order__address__searchbox__text}>
                  Коментар до адреси:
                </p>

                <textarea
                  className={s.payment__mobile__main__order__address__searchbox__input__specification}
                  maxLength={50}
                />
              </div>

              <div className={s.payment__mobile__main__order__address__searchbox}>
                <h2 className={s.payment__mobile__main__order__address__searchbox__h2}>
                  Способи оплати
                </h2>

                <button
                  type="button"
                  className={s.payment__mobile__main__order__address__searchbox__select__menu}
                  onClick={handleOpenOptions}
                >
                  <button
                    type="button"
                    className={classNames(
                      s.payment__mobile__main__order__address__searchbox__select__btn,
                      [isPaymentOpen && s.payment__mobile__main__order__address__searchbox__select__btn__active],
                    )}
                  >
                    {paymentChoose === SelectedMethod.SELECT ? (
                      <p
                        className={s.payment__mobile__main__order__address__searchbox__select__sBtn__text}
                      >
                        Виберіть спосіб оплати
                      </p>
                    ) : (
                      <>
                        {paymentChoose !== SelectedMethod.CASH ? (
                          <>
                            <p
                              className={classNames(
                                s.payment__mobile__main__order__address__searchbox__select__option,
                                [paymentChoose === SelectedMethod.CARD && s.payment__mobile__main__order__address__searchbox__select__option__active],
                              )}
                            >
                              <div className={`${s.payment__mobile__main__order__address__searchbox__select__option__card__icon} ${s.payment__mobile__main__order__address__searchbox__select__option__card__icon__card}`} />
                              <p className={s.payment__mobile__main__order__address__searchbox__select__option__text}>
                                Картка
                              </p>
                            </p>
                          </>
                        ) : (
                          <p
                            className={classNames(
                              s.payment__mobile__main__order__address__searchbox__select__option,
                              [paymentChoose === SelectedMethod.CASH && s.payment__mobile__main__order__address__searchbox__select__option__active],
                            )}
                          >
                            <div className={`${s.payment__mobile__main__order__address__searchbox__select__option__card__icon} ${s.payment__mobile__main__order__address__searchbox__select__option__card__icon__cash}`} />
                            <p className={s.payment__mobile__main__order__address__searchbox__select__option__text}>
                              Готівкою
                            </p>
                          </p>
                        )}
                      </>
                    )}

                    <div
                      className={classNames(
                        s.payment__mobile__main__order__address__searchbox__select__icon,
                        [isPaymentOpen && s.payment__mobile__main__order__address__searchbox__select__icon__active],
                      )}
                    />
                  </button>

                  {isPaymentOpen && (
                    <ul className={s.payment__mobile__main__order__address__searchbox__select__options}>
                      <button
                        onClick={() => handleSelectPayment(SelectedMethod.CARD)}
                        type="button"
                        className={s.payment__mobile__main__order__address__searchbox__select__option}
                      >
                        <div className={classNames(
                          s.payment__mobile__main__order__address__searchbox__select__option__card__icon,
                          s.payment__mobile__main__order__address__searchbox__select__option__card__icon__card,
                          [paymentChoose === SelectedMethod.CARD && s.payment__mobile__main__order__address__searchbox__select__option__card__icon__card__active],
                        )}
                        />
                        <p className={classNames(
                          s.payment__mobile__main__order__address__searchbox__select__option__text,
                          [paymentChoose === SelectedMethod.CARD && s.payment__mobile__main__order__address__searchbox__select__option__text__active],
                        )}
                        >
                          Картка
                        </p>
                      </button>

                      <button
                        onClick={() => handleSelectPayment(SelectedMethod.CASH)}
                        type="button"
                        className={s.payment__mobile__main__order__address__searchbox__select__option}
                      >
                        <div className={classNames(
                          s.payment__mobile__main__order__address__searchbox__select__option__card__icon,
                          s.payment__mobile__main__order__address__searchbox__select__option__card__icon__cash,
                          [paymentChoose === SelectedMethod.CASH && s.payment__mobile__main__order__address__searchbox__select__option__card__icon__cash__active],
                        )}
                        />
                        <p className={classNames(
                          s.payment__mobile__main__order__address__searchbox__select__option__text,
                          [paymentChoose === SelectedMethod.CASH && s.payment__mobile__main__order__address__searchbox__select__option__text__active],
                        )}
                        >
                          Готівкою
                        </p>
                      </button>
                    </ul>
                  )}
                </button>

                {paymentChoose === SelectedMethod.CARD && (
                  <div className={s.card__optional}>
                    <div className={s.card__optional__info}>
                      <p className={s.card__optional__text}>
                        Номер картки
                      </p>
                      <input
                        type="text"
                      />
                    </div>
                    <div className={s.card__optional__info}>
                      <p className={s.card__optional__text}>
                        дата
                      </p>
                      <input
                        type="text"
                      />
                    </div>

                    <div className={s.card__optional__info}>
                      <p className={s.card__optional__text}>
                        CVV
                      </p>
                      <input
                        type="text"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={s.payment__mobile__main__order__contact}>
            <h1 className={s.payment__mobile__main__order__contact__text}>
              Контактні дані
            </h1>

            <div className={s.payment__mobile__main__order__contact__container}>
              <div className={s.payment__mobile__main__order__contact__searchbox}>
                <p className={s.payment__mobile__main__order__contact__searchbox__text}>
                  Ваше імя
                </p>

                <input
                  type="text"
                  className={s.payment__mobile__main__order__contact__searchbox__input__specification}
                  maxLength={50}
                />
              </div>
            </div>

            <div className={s.payment__mobile__main__order__contact__container}>
              <div className={s.payment__mobile__main__order__contact__searchbox}>
                <p className={s.payment__mobile__main__order__contact__searchbox__text}>
                  Номер телефону
                </p>

                <div className={s.payment__mobile__main__order__contact__searchbox__phone}>
                  <div className={s.payment__mobile__main__order__contact__searchbox__phone__info}>
                    <img src={ukraineIcon} alt="Ukraine" className={s.payment__mobile__main__order__contact__searchbox__phone__info__img} />
                    <p className={s.payment__mobile__main__order__contact__searchbox__phone__info__text}>+380</p>
                  </div>
                  <input
                    type="tel"
                    className={s.payment__mobile__main__order__contact__searchbox__phone__input}
                    maxLength={12}
                  />
                </div>
              </div>
            </div>

            <div className={s.payment__mobile__main__order__contact__container}>
              <div className={s.payment__mobile__main__order__contact__searchbox}>
                <p className={s.payment__mobile__main__order__contact__searchbox__text}>
                  Електронна пошта
                </p>

                <input
                  type="email"
                  className={s.payment__mobile__main__order__contact__searchbox__input__specification}
                  maxLength={50}
                />
              </div>
            </div>

            <div className={s.payment__mobile__main__order__time__searchbox}>
              <h2 className={s.payment__mobile__main__order__time__searchbox__h2}>
                Коли?
              </h2>

              <div className={s.select__wrapper}>
                <button
                  type="button"
                  className={classNames(
                    s.payment__mobile__main__order__time__searchbox__select__menu,
                    [timeChoose === SelectedTime.CHOOSE_TIME && s.select__searchbox],
                  )}
                  onClick={handleOpenTimeSelector}
                >
                  <div
                    className={classNames(
                      s.payment__mobile__main__order__time__searchbox__select__btn,
                      [isTimeSelectorOpen && s.payment__mobile__main__order__time__searchbox__select__btn__active],
                    )}
                  >
                    <p className={s.payment__mobile__main__order__time__searchbox__select__sBtn__text}>
                      {timeChoose === SelectedTime.AS_SOON ? 'Якнайшвидше' : 'Вибрати час'}
                    </p>
                    <div
                      className={classNames(
                        s.payment__mobile__main__order__time__searchbox__select__icon,
                        [isTimeSelectorOpen && s.payment__mobile__main__order__time__searchbox__select__icon__active],
                      )}
                    />
                  </div>

                  {isTimeSelectorOpen && (
                    <ul className={s.payment__mobile__main__order__time__searchbox__select__options}>
                      <button
                        type="button"
                        className={classNames(
                          s.payment__mobile__main__order__time__searchbox__select__options__option,
                          s.payment__mobile__main__order__time__searchbox__select__options__option__as_soon,
                        )}
                        onClick={() => (setTimeChoose(SelectedTime.AS_SOON))}
                      >
                        <div
                          className={classNames(
                            s.payment__mobile__main__order__time__searchbox__select__options__option__card_icon,
                            s.payment__mobile__main__order__time__searchbox__select__options__option__card_icon__timer,
                            [timeChoose === SelectedTime.AS_SOON && s.payment__mobile__main__order__time__searchbox__select__options__option__card_icon__timer__active],
                          )}
                        />
                        <p
                          className={classNames(
                            s.payment__mobile__main__order__time__searchbox__select__options__option__text,
                            [timeChoose === SelectedTime.AS_SOON && s.payment__mobile__main__order__time__searchbox__select__options__option__text__active],
                          )}
                        >
                          Якнайшвидше
                        </p>
                      </button>

                      <button
                        type="button"
                        className={s.payment__mobile__main__order__time__searchbox__select__options__option}
                        onClick={() => (setTimeChoose(SelectedTime.CHOOSE_TIME))}
                      >
                        <div
                          className={classNames(
                            s.payment__mobile__main__order__time__searchbox__select__options__option__card_icon,
                            s.payment__mobile__main__order__time__searchbox__select__options__option__card_icon__clock,
                            [timeChoose === SelectedTime.CHOOSE_TIME && s.payment__mobile__main__order__time__searchbox__select__options__option__card_icon__clock__active],
                          )}
                        />
                        <p
                          className={classNames(
                            s.payment__mobile__main__order__time__searchbox__select__options__option__text,
                            [timeChoose === SelectedTime.CHOOSE_TIME && s.payment__mobile__main__order__time__searchbox__select__options__option__text__active],
                          )}
                        >
                          Вибрати час
                        </p>
                      </button>
                    </ul>
                  )}
                </button>

                {timeChoose === SelectedTime.CHOOSE_TIME && (
                  <select className={s.select}>
                    <option value="1">10.00</option>
                    <option value="1">10.30</option>
                    <option value="1">11.00</option>
                    <option value="1">11.30</option>
                    <option value="1">12.00</option>
                    <option value="1">12.30</option>
                    <option value="1">13.00</option>
                    <option value="1">13.30</option>
                    <option value="1">14.00</option>
                    <option value="1">14.30</option>
                    <option value="1">15.00</option>
                    <option value="1">15.30</option>
                    <option value="1">16.00</option>
                    <option value="1">16.30</option>
                    <option value="1">17.00</option>
                    <option value="1">17.30</option>
                    <option value="1">18.00</option>
                    <option value="1">18.30</option>
                    <option value="1">19.00</option>
                    <option value="1">19.30</option>
                  </select>
                )}
              </div>
            </div>

            <div className={s.payment__mobile__main__order__payment}>
              <div className={s.payment__mobile__main__order__payment__info}>
                <p className={s.payment__mobile__main__order__payment__info__text}>Cтрави</p>

                <p className={s.payment__mobile__main__order__payment__info__price}>1338 ГРН</p>
              </div>

              <div className={s.payment__mobile__main__order__payment__info}>
                <p className={s.payment__mobile__main__order__payment__info__text}>Упаковка</p>

                <p className={s.payment__mobile__main__order__payment__info__price}>68 ГРН</p>
              </div>

              <div className={s.payment__mobile__main__order__payment__info}>
                <p className={s.payment__mobile__main__order__payment__info__text__h1}>До оплати</p>

                <p className={s.payment__mobile__main__order__payment__info__price__h1}>1338 ГРН</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={s.payment__mobile__main__button}
        >
          <p className={s.payment__mobile__main__button__text}>
            Підтвердити
          </p>
        </button>
      </main>
    </div>
  );
};
