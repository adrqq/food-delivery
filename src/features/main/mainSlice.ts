/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedPage } from '../../types/selectedPage';

const initialState = {
  isOrderMenuOpen: false,
  isProductModalOpen: false,
  isLogOutModalOpen: false,
  isDeleteProductModalOpen: false,
  isPaymentStage: false,
  selectedPage: SelectedPage.HOME,
  brandName: 'Дукат',
  pagePath: '/home',
  showAddedNotification: false,
  isBurgerMenuOpen: false,
};

export interface MainSliceState {
  isOrderMenuOpen: boolean;
  isProductModalOpen: boolean;
  isLogOutModalOpen: boolean;
  isDeleteProductModalOpen: boolean;
  isPaymentStage: boolean;
  selectedPage: SelectedPage;
  brandName: string;
  showAddedNotification: boolean,
  isBurgerMenuOpen: boolean,
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

    setSelectedPage(state, action: PayloadAction<SelectedPage>) {
      state.selectedPage = action.payload;
    },

    setPagePath(state, action: PayloadAction<string>) {
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
  },
});

export const {
  setOrderMenuOpen,
  setProductModalOpen,
  setPaymentStage,
  setSelectedPage,
  setPagePath,
  setShowAddedNotification,
  setIsLogOutModalOpen,
  setIsDeleteProductModalOpen,
  setIsBurgerMenuOpen,
} = mainSlice.actions;

export default mainSlice.reducer;
