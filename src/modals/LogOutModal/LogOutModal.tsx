/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import s from './LogOutModal.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersSlice';
import { setIsLogOutModalOpen } from '../../features/main/mainSlice';

export const LogOutModal = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(logout())
      .then(() => {
        dispatch(setIsLogOutModalOpen(false));

        window.location.reload();
      });
  };

  return (
    <div className={s.log_out}>
      <div className={s.log_out__window}>
        <h1 className={s.log_out__window__title}>Ви впевнені що хочете вийти?</h1>
        <div className={s.log_out__window__buttons}>
          <button
            type="button"
            className={s.log_out__window__button}
            onClick={handleLogOut}
          >
            Так
          </button>
          <button
            type="button"
            className={s.log_out__window__button}
            onClick={() => dispatch(setIsLogOutModalOpen(false))}
          >
            Ні
          </button>
        </div>
      </div>
    </div>
  );
};
