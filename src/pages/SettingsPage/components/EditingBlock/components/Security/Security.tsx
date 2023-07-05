/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import s from './Security.module.scss';
import { PagePath } from '../../../../../../types/PagePath';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setPagePath } from '../../../../../../features/main/mainSlice';
import { changeUserData } from '../../../../../../features/users/usersSlice';

export const Security: React.FC = () => {
  const user = useAppSelector((state) => state.users.user);

  const [email, setEmail] = React.useState(user.email || '');
  const [username, setUsername] = React.useState(user.name || '');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPagePath(PagePath.SETTINGS__SECURITY));
  }, []);

  const handleChangeUserData = () => {
    dispatch(changeUserData({
      oldEmail: user.email,
      oldPassword: currentPassword,
      name: username,
      role: user.role,
      email,
      password: newPassword,
    }));
  };

  return (
    <div className={s.security__page}>
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

                <input
                  type="password"
                  className={s.security__page__registration__new__password__input}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className={s.security__page__confirm}>
                <div className={s.security__page__confirm__text}>
                  Підтвердіть пароль
                  {' '}
                  <br />
                  {' '}
                  (Потрібно якщо ви змінюєте пароль)
                </div>

                <input
                  type="password"
                  className={s.security__page__confirm__input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={s.security__page__right}>
              <div className={s.security__page__current__password}>
                <div className={s.security__page__current__password__text}>
                  Теперішній пароль (Обов’язково для зміни будь-яких даних)
                </div>

                <input
                  type="password"
                  className={s.security__page__current__password__input}
                  placeholder="*****"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
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
