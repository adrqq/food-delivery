/* eslint-disable max-len */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import s from './NotificationPopup.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPopupMessage } from '../../features/main/mainSlice';

export const NotificationPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const popupMessage = useAppSelector((state) => state.main.popupMessage);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setPopupMessage({
        text: '',
        success: false,
      }));
    }, 3000);
  }, [popupMessage.text]);

  const handlePopupClose = () => {
    dispatch(setPopupMessage({
      text: '',
      success: false,
    }));
  };

  return (
    popupMessage.text ? (
      <button
        type="button"
        className={classNames(
          s.popup__wrapper,
          { [s.popup__wrapper__success]: popupMessage.success },
        )}
        onClick={handlePopupClose}
      >
        <div className={s.popup}>
          <p className={s.popup__text}>{popupMessage.text}</p>
        </div>
      </button>
    ) : (
      <></>
    )
  );
};
