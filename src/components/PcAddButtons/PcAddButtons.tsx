/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import s from './PcAddButtons.module.scss';
import { ProductModel } from '../../models/ProductModel';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { calculateCartInfo } from '../../features/products/productsSlice';
import minusIcon from '../../images/logos/minus-logo.svg';
import plusIcon from '../../images/logos/plus-black.svg';
import trashIcon from '../../images/logos/trash-icon.svg';
import { addProductToLocalCartUtil } from '../../utils/functions/addProductToLocalCartUtil';
import { addProductToUserCartUtil } from '../../utils/functions/addProductToUserCartUtil';
import { decreaseLocalProductsCountUtil } from '../../utils/functions/decreaseLocalProductsCountUtil';
import { decreaseUserProductsCountUtil } from '../../utils/functions/decreaseUserProductsCountUtil';
import { removeProductFromLocalCartUtil } from '../../utils/functions/removeProductFromLocalCartUtil';
import { removeProductFromUserCartUtil } from '../../utils/functions/removeProductFromUserCart';
import { setShowAddedNotification } from '../../features/main/mainSlice';

type Props = {
  product: ProductModel,
};

export const PcAddButtons: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  // const product = useAppSelector((state) => state.products.selectedProduct);
  const user = useAppSelector((state) => state.users.user);
  const userCart = useAppSelector((state) => state.products.userCart);

  const findProductInCart = () => {
    if (!isUserAuth) {
      if (localStorage.getItem('cart') === null) {
        return false;
      }

      const cart = JSON.parse(localStorage.getItem('cart') as string);

      const isProductInCart = cart.find((item: ProductModel) => item.id === product.id);

      if (isProductInCart?.count >= 1) {
        return isProductInCart;
      }

      return isProductInCart;
    }

    return userCart.find((item: ProductModel) => item?.id === product?.id);
  };

  const handleDecreaseProductsCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isUserAuth) {
      decreaseLocalProductsCountUtil(dispatch, product);
    } else {
      decreaseUserProductsCountUtil(dispatch, user, product);
    }

    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  };

  const handleAddProductToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isUserAuth) {
      addProductToLocalCartUtil(dispatch, product);
    } else {
      addProductToUserCartUtil(dispatch, user, product);
    }

    dispatch(setShowAddedNotification(true));

    setTimeout(() => {
      dispatch(setShowAddedNotification(false));
    }, 1500);

    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  };

  const handleRemoveProductFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isUserAuth) {
      removeProductFromLocalCartUtil(dispatch, product);
    } else {
      removeProductFromUserCartUtil(dispatch, user, product);
    }

    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  };

  return (
    <div className={s.pc_add_buttons}>
      {findProductInCart()?.count > 1 ? (
        <>
          <button
            className={s.pc_add_buttons__button}
            type="button"
            onClick={(e) => (handleDecreaseProductsCount(e))}
          >
            <img
              src={minusIcon}
              alt="minus-icon"
            />
          </button>

          <p className={s.pc_add_buttons__product_count}>
            {findProductInCart()?.count}
          </p>

          <button
            className={classNames(
              s.pc_add_buttons__button,
            )}
            type="button"
            onClick={(e) => (handleAddProductToCart(e))}
          >
            <img
              src={plusIcon}
              alt="minus-icon"
            />
          </button>
        </>
      ) : (
        <>
          <button
            className={s.pc_add_buttons__button}
            type="button"
            onClick={(e) => (handleRemoveProductFromCart(e))}
          >
            <img
              src={trashIcon}
              alt="trash-icon"
            />
          </button>

          <p className={s.pc_add_buttons__product_count}>
            {findProductInCart()?.count}
          </p>

          <button
            className={classNames(
              s.pc_add_buttons__button,
            )}
            type="button"
            onClick={(e) => (handleAddProductToCart(e))}
          >
            <img
              src={plusIcon}
              alt="minus-icon"
            />
          </button>
        </>
      )}
    </div>
  );
};
