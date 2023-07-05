/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import { OrderItem } from '../../../../components/OrderItem';
import s from './OrderSecondStage.module.scss';
import { ProductModel } from '../../../../models/ProductModel';
// import creditCardLogo from '../../../../images/logos/close.svg';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setPaymentStage } from '../../../../features/main/mainSlice';

enum PaymentType {
  CASH = 'cash',
  CARD = 'card',
  PAYPAL = 'paypal',
}

export const OrderSecondStage: React.FC = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.CARD);

  const dispatch = useAppDispatch();

  const isPaymentStage = useAppSelector((state) => state.main.isPaymentStage);

  const handlePaymentTypeChange = (type: PaymentType) => {
    setPaymentType(type);
  };

  const handleClosePaymentStage = () => {
    document.body.style.position = 'unset';
    dispatch(setPaymentStage(false));
  };

  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClosePaymentStage();
      }
    }

    // Attach event listener to the window object
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      {isPaymentStage && (
        <div className={s.container}>
          <div className={s.order_second__wrapper} ref={ref}>
            <button
              type="button"
              className={s.order_second__back_button}
              onClick={() => handleClosePaymentStage()}
            />
            <div className={s.order_second}>
              <div className={s.order_second__details}>
                <div className={s.order_second__details__header}>
                  <div className={s.order_second__details__header__info}>
                    <h1 className={s.order_second__details__header__title}>
                      Confirmation
                    </h1>
                    <h2 className={s.order_second__details__header__number}>
                      Order #322
                    </h2>
                  </div>

                  <button type="button" className={s.order_second__details__header__add_button} />
                </div>

                <div className={s.order_second__details__main}>
                  {localStorage.getItem('order') ? (
                    JSON.parse(localStorage.getItem('order') as string).map((item: ProductModel) => (
                      <OrderItem
                        key={item.id}
                        item={item}
                      />
                    ))
                  ) : (
                    <div className={s.order_second__details__main__empty}>
                      Your order is empty
                    </div>
                  )}
                </div>

                <div className={s.order_second__details__footer}>
                  <div className={s.order_second__details__footer__info}>
                    <div className={s.order_second__details__footer__discount}>
                      <div className={s.order_second__details__footer__discount__title}>
                        Discount:
                      </div>
                      <div className={s.order_second__details__footer__discount__value}>
                        0$
                      </div>
                    </div>

                    <div className={s.order_second__details__footer__total__price}>
                      <div className={s.order_second__details__footer__total__price__title}>
                        Total price:
                      </div>
                      <div className={s.order_second__details__footer__total__price__value}>
                        22.70$
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={s.order_second__payment}>
                <div className={s.order_second__payment__header}>
                  <h1 className={s.order_second__payment__header__title}>
                    Payment
                  </h1>

                  <h2 className={s.order_second__payment__header__info}>
                    3 payment method available
                  </h2>
                </div>

                <div className={s.order_second__payment__main}>
                  <h1 className={s.order_second__payment__main__title}>
                    Payment Method
                  </h1>

                  <div className={s.order_second__payment__main__choice}>
                    <label className={s.order_second__payment__main__choice__label}>
                      <input
                        type="radio"
                        className={s.order_second__payment__main__choice__input}
                        name="payment"
                        onChange={() => handlePaymentTypeChange(PaymentType.CARD)}
                      />

                      <div className={`${s.order_second__payment__main__choice__logo} ${s.order_second__payment__main__choice__logo_card}`} />
                      <p className={s.order_second__payment__main__choice__text}>
                        Credit Card
                      </p>
                      <div className={`${s.order_second__payment__main__choice__check_mark} ${paymentType === PaymentType.CARD && s.order_second__payment__main__choice__check_mark__active}`} />
                    </label>

                    <label className={s.order_second__payment__main__choice__label}>
                      <input
                        type="radio"
                        className={s.order_second__payment__main__choice__input}
                        name="payment"
                        onChange={() => handlePaymentTypeChange(PaymentType.PAYPAL)}
                      />

                      <div className={`${s.order_second__payment__main__choice__logo} ${s.order_second__payment__main__choice__logo_pp}`} />
                      <p className={s.order_second__payment__main__choice__text}>
                        Paypal
                      </p>

                      <div className={`${s.order_second__payment__main__choice__check_mark} ${paymentType === PaymentType.PAYPAL && s.order_second__payment__main__choice__check_mark__active}`} />
                    </label>

                    <label className={s.order_second__payment__main__choice__label}>
                      <input
                        type="radio"
                        className={s.order_second__payment__main__choice__input}
                        name="payment"
                        onChange={() => handlePaymentTypeChange(PaymentType.CASH)}
                      />

                      <div className={`${s.order_second__payment__main__choice__logo} ${s.order_second__payment__main__choice__logo_cash}`} />
                      <p className={s.order_second__payment__main__choice__text}>
                        Cash
                      </p>

                      <div className={`${s.order_second__payment__main__choice__check_mark} ${paymentType === PaymentType.CASH && s.order_second__payment__main__choice__check_mark__active}`} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
