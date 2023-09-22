/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AsyncThunk,
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ErrorType, ProductCategory } from '../../types/Products';
import { useAppSelector } from '../../app/hooks';
import { ProductModel } from '../../models/ProductModel';
import { CartModel } from '../../models/CartModel';
import { CartItemModel } from '../../models/CartItemModel';
import { ImageData } from '../../types/ImageData';
import { SortType } from '../../types/SortType';

const initialState = {
  products: [] as ProductModel[],
  isProductsLoading: false,
  error: [] as ErrorType[],
  errorText: '',
  selectedFilter: ProductCategory.ALL,
  itemsPerPage: 16,
  currentPage: 1,
  productsLength: 0,
  searchQuery: '',
  localStorageCart: [] as ProductModel[],
  cartItemsCount: 0,
  cartTotalPrice: 0,
  selectedProduct: {} as ProductModel,
  selectedEditProduct: {} as ProductModel,
  userCart: [] as ProductModel[],
  images: [] as ImageData[],
  sortType: SortType.PRICE_ASC,
  callProductsUpdate: false,
};

export interface ProductsState {
  products: ProductModel[];
  isProductsLoading: boolean;
  error: ErrorType[];
  errorText: string;
  selectedFilter: ProductCategory;
  itemsPerPage: number;
  currentPage: number;
  productsLength: number;
  searchQuery: string;
  localStorageCart: ProductModel[];
  cartItemsCount: number;
  cartTotalPrice: number;
  selectedProduct: ProductModel;
  selectedEditProduct: ProductModel;
  userCart: ProductModel[];
  images: ImageData[];
  sortType: SortType;
  callProductsUpdate: boolean;
}

export const calculateCartInfo = createAsyncThunk(
  'calculateCartInfo',
  async (payload: { userCart: ProductModel[], isUserAuth: boolean }, { rejectWithValue }) => {
    let total = 0;
    let count = 0;
    const cart = JSON.parse(localStorage.getItem('cart') as string);

    if (payload.isUserAuth) {
      if (payload.userCart.length > 0) {
        payload.userCart.forEach((item: ProductModel) => {
          total += item.price * item.count;
          count += 1;
        });
      }
    } else if (cart) {
      cart.forEach((item: ProductModel) => {
        total += item.price * item.count;
        count += 1;
      });
    } else {
      total = 0;
      count = 0;
    }

    return {
      total,
      count,
    };
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setErrorText(state, action: PayloadAction<string>) {
      // state.errorText = action.payload;
    },

    setIsProductsLoading(state, action: PayloadAction<boolean>) {
      state.isProductsLoading = action.payload;
    },

    getProductsStart(state) {
      state.isProductsLoading = true;
    },

    getProductsSuccess(state, action: PayloadAction<ProductModel[]>) {
      state.products = action.payload;

      state.isProductsLoading = false;

      console.log('getProductsSuccess');
    },

    getProductsFailure(state, action: PayloadAction<ErrorType>) {
      state.isProductsLoading = false;
      state.error.push(action.payload);
    },

    removeError(state, action: PayloadAction<ErrorType>) {
      state.error = state.error.filter((item) => item !== action.payload);
    },

    setFilter(state, action: PayloadAction<ProductCategory>) {
      state.selectedFilter = action.payload;

      state.currentPage = 1;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;

      state.currentPage = 1;
    },

    setProductsLength(state, action: PayloadAction<number>) {
      state.productsLength = action.payload;
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;

      state.currentPage = 1;
    },

    setLocalStorageCart(state, action: PayloadAction<ProductModel[]>) {
      state.localStorageCart = action.payload;
    },

    setSelectedProduct(state, action: PayloadAction<ProductModel>) {
      state.selectedProduct = action.payload;
    },

    setUserCart(state, action: PayloadAction<ProductModel[]>) {
      state.userCart = action.payload;
    },

    addProductToUserCart(state, action: PayloadAction<ProductModel>) {
      const existingItem = state.userCart.find(item => item?.id === action.payload?.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.userCart.push({ ...action.payload, count: 1 } as ProductModel);
      }
    },

    removeProductFromUserCart(state, action: PayloadAction<number>) {
      const existingItem = state.userCart.find(item => item?.id === action.payload);

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.userCart = state.userCart.filter(item => item?.id !== action.payload);
        }
      }
    },

    deleteProductFromUserCart(state, action: PayloadAction<number>) {
      const existingItem = state.userCart.find(item => item?.id === action.payload);

      if (existingItem) {
        state.userCart = state.userCart.filter(item => item?.id !== action.payload);
      }
    },

    setProductImage(state, action: PayloadAction<{ productId: number, imageData: any }>) {
      state.images.push({
        productId: action.payload.productId,
        imageData: action.payload.imageData,
      });
    },

    setProductImages(state, action: PayloadAction<ImageData[]>) {
      state.images = action.payload;
    },

    setSelectedEditProduct(state, action: PayloadAction<ProductModel>) {
      state.selectedEditProduct = action.payload;
    },

    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },

    setCallProductsUpdate(state) {
      state.callProductsUpdate = !state.callProductsUpdate;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calculateCartInfo.fulfilled, (state, action) => {
      state.cartItemsCount = action.payload.count;
      state.cartTotalPrice = action.payload.total;
    });
  },
});

export const {
  setIsProductsLoading,
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  setFilter,
  setCurrentPage,
  setItemsPerPage,
  setProductsLength,
  setErrorText,
  setSearchQuery,
  setLocalStorageCart,
  setSelectedProduct,
  setUserCart,
  addProductToUserCart,
  removeProductFromUserCart,
  deleteProductFromUserCart,
  setProductImage,
  setProductImages,
  setSelectedEditProduct,
  removeError,
  setSortType,
  setCallProductsUpdate,
} = productsSlice.actions;

export default productsSlice.reducer;
