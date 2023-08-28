/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import s from './Security.module.scss';
import { PagePath } from '../../../../../../types/PagePath';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setPagePath, setPopupMessage } from '../../../../../../features/main/mainSlice';
import { changeUserData } from '../../../../../../features/users/usersSlice';
import { NotificationPopup } from '../../../../../../components/NotificationPopup';
import eyeIconClosed from '../../../../../../images/logos/password-eye-closed.svg';
import eyeIconOpened from '../../../../../../images/logos/password-eye-open.svg';

export const Security: React.FC = () => {
  const user = useAppSelector((state) => state.users.user);

  const [email, setEmail] = React.useState(user.email || '');
  const [username, setUsername] = React.useState(user.name || '');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isShowCurrentPassword, setIsShowCurrentPassword] = React.useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = React.useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPagePath(PagePath.SETTINGS__SECURITY));
  }, []);

  const handleChangeUserData = () => {
    if (!email.trim()) {
      dispatch(setPopupMessage({
        text: 'Введіть поточну або нову електронну пошту',
        success: false,
      }));

      return;
    }

    if (!currentPassword.trim()) {
      dispatch(setPopupMessage({
        text: 'Введіть поточний пароль',
        success: false,
      }));

      return;
    }

    if (!username.trim()) {
      dispatch(setPopupMessage({
        text: 'Введіть новий нікнейм або залиште старий',
        success: false,
      }));

      return;
    }

    if (newPassword !== confirmPassword) {
      dispatch(setPopupMessage({
        text: 'Паролі не співпадають',
        success: false,
      }));

      // return;
    }

    if (currentPassword.trim() === newPassword.trim()) {
      dispatch(setPopupMessage({
        text: 'Новий пароль не повинен співпадати з поточним',
        success: false,
      }));

      return;
    }

    if (email.trim() === user.email && username.trim() === user.name && newPassword === '' && confirmPassword === '') {
      dispatch(setPopupMessage({
        text: 'Ви не змінили жодного поля',
        success: false,
      }));

      return;
    }

    dispatch(changeUserData({
      oldEmail: user.email,
      oldPassword: currentPassword,
      name: username,
      role: user.role,
      email: email.trim() === user.email ? user.email : email.trim(),
      password: newPassword,
    }));
  };

  return (
    <div className={s.security__page}>
      <NotificationPopup />
      <form
        className={s.security__page__body}
        onSubmit={(e) => {
          e.preventDefault();
          handleChangeUserData();
        }}
      >
        <div className={s.security__page__container}>
          <h1 className={s.security__page__text}>
            Інформація
          </h1>

          <div className={s.security__page__wrapper}>
            <div className={s.security__page__left}>
              <div className={s.security__page__registration}>
                <div className={s.security__page__registration__email__text__wrapper}>
                  <div className={s.security__page__registration__email__dots}>
                    *
                  </div>
                  <span className={s.security__page__registration__email__text}>
                    Електронна пошта
                  </span>
                </div>

                <input
                  type="email"
                  className={s.security__page__registration__email__input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Якщо ви хочете змінити електронну пошту, введіть нову"
                />
              </div>

              <div className={s.security__page__username}>
                <div className={s.security__page__username__text__wrapper}>
                  <div className={s.security__page__username__dots}>
                    *
                  </div>

                  <span className={s.security__page__username__text}>
                    Нікнейм
                  </span>
                </div>

                <input
                  type="text"
                  className={s.security__page__username__input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            {/* <div className={s.security__page__right}>
              <div className={s.security__page__phone}>
                <div className={s.security__page__phone__text__wrapper}>
                  <div className={s.security__page__phone__dots}>
                    *
                  </div>

                  <span className={s.security__page__phone__text}>
                    Телефон
                  </span>
                </div>
                <input type="email" className={s.security__page__phone__input} />
              </div>

              <div className={s.security__page__card}>
                <div className={s.security__page__card__text__wrapper}>
                  <div className={s.security__page__card__dots}>
                    *
                  </div>
                  <span className={s.security__page__card__text}>
                    Карта
                  </span>
                </div>

                <input type="password" className={s.security__page__card__input} />
              </div>
            </div> */}
          </div>
        </div>

        <div className={s.security__page__container}>
          <h1 className={s.security__page__text}>
            Пароль
          </h1>

          <div className={s.security__page__wrapper__password}>
            <div className={s.security__page__left__password}>
              <div className={s.security__page__registration__password}>
                <span className={s.security__page__registration__new__password__text}>
                  Новий пароль
                  {' '}
                  <br />
                  (Залиште поле порожнім, якщо не хочете змінювати пароль)
                </span>

                <div className={s.security__page__registration__new__password__input__wrapper}>
                  <input
                    type={isShowNewPassword ? 'text' : 'password'}
                    className={s.security__page__registration__new__password__input}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className={s.security__page__registration__new__password__eye}
                    onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                  >
                    {isShowNewPassword ? (
                      <img alt="eye-open" src={eyeIconOpened} />
                    ) : (
                      <img alt="eye-closed" src={eyeIconClosed} />
                    )}
                  </button>
                </div>
              </div>

              <div className={s.security__page__confirm}>
                <div className={s.security__page__confirm__text}>
                  Підтвердіть пароль
                  {' '}
                  <br />
                  {' '}
                  (Потрібно якщо ви змінюєте пароль)
                </div>

                <div className={s.security__page__registration__new__password__input__wrapper}>
                  <input
                    type={isShowNewPassword ? 'text' : 'password'}
                    className={s.security__page__confirm__input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className={s.security__page__registration__new__password__eye}
                    onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                  >
                    {isShowNewPassword ? (
                      <img alt="eye-open" src={eyeIconOpened} />
                    ) : (
                      <img alt="eye-closed" src={eyeIconClosed} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className={s.security__page__right}>
              <div className={s.security__page__current__password}>
                <div className={s.security__page__current__password__text}>
                  Теперішній пароль (Обов’язково для зміни будь-яких даних)
                </div>

                <div className={s.security__page__registration__new__password__input__wrapper}>
                  <input
                    type={isShowCurrentPassword ? 'text' : 'password'}
                    className={s.security__page__current__password__input}
                    placeholder="*****"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className={s.security__page__registration__new__password__eye__current}
                    onClick={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
                  >
                    {isShowCurrentPassword ? (
                      <img alt="eye-open" src={eyeIconOpened} />
                    ) : (
                      <img alt="eye-closed" src={eyeIconClosed} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={s.security__page__button}
        >
          Зберегти
        </button>
      </form>
    </div>
  );
};
