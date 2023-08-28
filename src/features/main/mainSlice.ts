/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PagePath } from '../../types/PagePath';
import { PopupMessage } from '../../types/PopupMessage';

const initialState = {
  isOrderMenuOpen: false,
  isProductModalOpen: false,
  isLogOutModalOpen: false,
  isDeleteProductModalOpen: false,
  isPaymentStage: false,
  pagePath: PagePath.MENU,
  brandName: 'Дукат',
  showAddedNotification: false,
  isBurgerMenuOpen: false,
  popupMessage: {} as PopupMessage,
};

export interface MainSliceState {
  isOrderMenuOpen: boolean;
  isProductModalOpen: boolean;
  isLogOutModalOpen: boolean;
  isDeleteProductModalOpen: boolean;
  isPaymentStage: boolean;
  pagePath: PagePath;
  brandName: string;
  showAddedNotification: boolean,
  isBurgerMenuOpen: boolean,
  popupMessage: PopupMessage;
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setOrderMenuOpen(state, action: PayloadAction<boolean>) {
      state.isOrderMenuOpen = action.payload;
    },
    setProductModalOpen(state, action: PayloadAction<boolean>) {
      state.isProductModalOpen = action.payload;
    },

    setPaymentStage(state, action: PayloadAction<boolean>) {
      state.isPaymentStage = action.payload;
    },

    setPagePath(state, action: PayloadAction<PagePath>) {
      state.pagePath = action.payload;
    },

    setShowAddedNotification(state, action: PayloadAction<boolean>) {
      state.showAddedNotification = action.payload;
    },

    setIsLogOutModalOpen(state, action: PayloadAction<boolean>) {
      state.isLogOutModalOpen = action.payload;
    },

    setIsDeleteProductModalOpen(state, action: PayloadAction<boolean>) {
      state.isDeleteProductModalOpen = action.payload;
    },

    setIsBurgerMenuOpen(state, action: PayloadAction<boolean>) {
      state.isBurgerMenuOpen = action.payload;
    },

    setPopupMessage(state, action: PayloadAction<PopupMessage>) {
      state.popupMessage = action.payload;
    },
  },
});

export const {
  setOrderMenuOpen,
  setProductModalOpen,
  setPaymentStage,
  setPagePath,
  setShowAddedNotification,
  setIsLogOutModalOpen,
  setIsDeleteProductModalOpen,
  setIsBurgerMenuOpen,
  setPopupMessage,
} = mainSlice.actions;

export default mainSlice.reducer;
