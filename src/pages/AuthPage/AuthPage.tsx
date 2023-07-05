/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Route, Routes, useNavigate } from 'react-router-dom';
import s from './AuthPage.module.scss';
import googleLogo from '../../images/logos/google-logo.svg';
import facebookLogo from '../../images/logos/facebook-logo.svg';
import plusPeople from '../../images/logos/plus-people.svg';
import arrowRight from '../../images/logos/arrow-oval-right-white.svg';
import manRight from '../../images/logos/man-right.svg';
import exitDoor from '../../images/logos/exit-door.svg';
import { Stage } from '../../types/products';
import { RegistrationErrorType } from '../../types/registrationErrorType';
import { Example } from '../../hooks';
import {
  login,
  registration,
  setRegistrationErrorType,
} from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import doorLogo from '../../images/logos/door.svg';
import { setLocalStorageCart } from '../../features/products/productsSlice';
import closedEyeIcon from '../../images/logos/password-eye-closed.svg';
import openEyeIcon from '../../images/logos/password-eye-open.svg';
import { Registration } from './components/Registration';
import { Login } from './components/Login';

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    is900,
  } = Example();

  return (
    <div
      className={s.container}
      id="container"
    // onKeyDown={handleKeyDown}
    >
      <div className={s.auth}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
};
