/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import s from './ActivationPage.module.scss';
import mailLogo from '../../images/logos/mail-colorful.svg';
import mailBlack from '../../images/logos/mail-black.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AuthService from '../../api/services/AuthService';

export const ActivationPage: React.FC = () => {
  const [timer, setTimer] = useState(30);

  const dispatch = useAppDispatch();

  const activationEmail = useAppSelector((state) => state.users.activationEmail);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendEmail = async () => {
    try {
      const response = await AuthService.sendActivationEmail(activationEmail);

      if (response.status === 200) {
        setTimer(30);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.activation}>
      <div className={s.activation__container}>
        <header className={s.activation__header}>
          <h1 className={s.activation__header__title}>
            Вітаємо ви на фінішній прямій залишилося підтвердити вашу електронну адресу
          </h1>

          <img
            src={mailLogo}
            alt="mailLogo"
            className={s.activation__header__logo}
          />
        </header>

        <main className={s.activation__info}>
          <p className={s.activation__info__text}>
            Для того, щоб продовжити, будь ласка, перейдіть на електронну адресу, яку ви вказали під час реєстрації, та перейдіть за посиланням у листі, який ми вам надіслали. Після цього ваш акаунт буде активовано, і ви зможете увійти до нього.
          </p>

          <section className={s.activation__info__no_mail}>
            <h2 className={s.activation__info__no_mail__title}>
              {`Якщо ви не отримали листа, будь ласка, перевірте папку "Спам" у вашій поштовій скринці або натисніть кнопку нижче яка зявиться через 30 секунд, і ми надішлемо вам нове повідомлення.`}
            </h2>

            {timer <= 0 ? (
              <button
                type="button"
                className={s.activation__info__no_mail__button}
                onClick={handleResendEmail}
              >
                <p className={s.activation__info__no_mail__button__text}>
                  Надіслати повторно
                </p>

                {/* <img
                  src={mailBlack}
                  alt="mailIcon"
                  className={s.activation__info__no_mail__button__logo}
                /> */}
              </button>
            ) : (
              <div className={s.activation__info__no_mail__timer}>
                {timer}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
