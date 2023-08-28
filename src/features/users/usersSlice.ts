/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { AuthResponse } from '../../models/response/AuthResponse';
import AuthService from '../../api/services/AuthService';
import { RegistrationErrorType } from '../../types/registrationErrorType';

const initialState = {
  user: {} as IUser,
  isUserAuth: false,
  isUsersLoading: true,
  isLoginError: false,
  registrationErrorType: RegistrationErrorType.NULL,
  activationEmail: '',
};

export interface UsersSliceState {
  user: IUser;
  isUserAuth: boolean;
  isUsersLoading: boolean;
  isLocalUser: false;
  isLoginError: boolean;
  registrationErrorType: RegistrationErrorType;
  activationEmail: string;
}

export const login = createAsyncThunk(
  'login',
  async (payload: { emailLogin: string; passwordLogin: string; remember: boolean }, { rejectWithValue }) => {
    try {
      console.log('payload', payload);
      const response = await AuthService.login(payload.emailLogin, payload.passwordLogin, payload.remember);

      localStorage.setItem('token', response.data.accessToken);

      if (!response.data.user.isActivated) {
        return rejectWithValue(payload.emailLogin);
      }

      console.log('response', response);
      console.log('user id', response.data.user.id);

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(false);
    }
  },
);

export const registration = createAsyncThunk(
  'registration',
  async (payload: { name: string, role: string, emailRegister: string; passwordRegister: string }, { rejectWithValue }) => {
    try {
      console.log('name', payload.name, 'role', payload.role, 'email', payload.emailRegister, 'password', payload.passwordRegister);

      const response = await AuthService.registration(payload.name, payload.role, payload.emailRegister, payload.passwordRegister);

      console.log('response', response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);

        return response.data.user;
      }

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const changeUserData = createAsyncThunk(
  'changeUserData',
  async (payload: {
    oldEmail: string,
    oldPassword: string,
    name: string,
    role: string,
    email: string,
    password: string
  }, { rejectWithValue }) => {
    try {
      console.log('payload', payload);

      const response = await AuthService.changeUserData(
        payload.oldEmail,
        payload.oldPassword,
        payload.name,
        payload.role,
        payload.email,
        payload.password,
      );

      console.log('response', response);

      if (response.status === 200) {
        // delete token from cookies

        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();

        return response.data.user;
      }

      return rejectWithValue(response.data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const logout = createAsyncThunk(
  'logout',
  async () => {
    try {
      console.log('logout');
      await AuthService.logout();

      localStorage.removeItem('token');
    } catch (e: any) {
      console.log(e.message);
    }
  },
);

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.checkAuth();

      console.log('response', response);

      localStorage.setItem('token', response.data.accessToken);

      if (typeof response.data === 'string') {
        return rejectWithValue(response.data as string);
      }

      if (response.status === 200) {
        return response.data.user;
      }

      return rejectWithValue(response.data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isUserAuth = action.payload;
    },

    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },

    setIsUsersLoading(state, action: PayloadAction<boolean>) {
      state.isUsersLoading = action.payload;
    },

    setRegistrationErrorType(state, action: PayloadAction<RegistrationErrorType>) {
      state.registrationErrorType = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      state.isUserAuth = true;
      state.user = action.payload;
      state.isLoginError = false;
    },
    [login.rejected.type]: (state, action) => {
      if (typeof action.payload === 'string') {
        state.activationEmail = action.payload;
      } else {
        state.isLoginError = true;
      }
    },
    [registration.fulfilled.type]: (state, action) => {
      state.activationEmail = action.payload.email;
      state.registrationErrorType = RegistrationErrorType.NULL;
    },
    [registration.rejected.type]: (state, action) => {
      state.registrationErrorType = RegistrationErrorType.EMAIL_ALREADY_EXIST;
      console.log(action.payload); // Handle error from rejectWithValue
    },
    [logout.fulfilled.type]: (state) => {
      state.isUserAuth = false;
      state.user = {} as IUser;
    },
    [checkAuth.fulfilled.type]: (state, action) => {
      state.isUserAuth = true;
      state.user = action.payload;
      console.log('checkAuth.fulfilled', action.payload);
      console.log('userId', state.user.id);
    },
    [checkAuth.rejected.type]: (state, action) => {
      const email = action.payload as string;

      state.isUserAuth = false;
      state.user = {} as IUser;
      state.activationEmail = email;
      console.log('checkAuth.rejected', action.payload);
    },
  },

});

export const {
  setAuth,
  setUser,
  setIsUsersLoading,
  setRegistrationErrorType,
} = usersSlice.actions;

export default usersSlice.reducer;
