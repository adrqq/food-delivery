/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import s from './ProductModal.module.scss';
// import foodPhotoMain from '../../images/food_photos/foodPhotoMain.jpg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import weightLogo from '../../images/logos/product_weight.svg';
import heartLogo from '../../images/logos/heart-icon.svg';
import { setProductModalOpen } from '../../features/main/mainSlice';

export const ProductModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<any>(null);

  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  const handleProductModalClose = () => {
    dispatch(setProductModalOpen(false));
  };

  useEffect(() => {
    document.body.style.height = '100vh';

    // eslint-disable-next-line no-console
    console.log('modal opened');

    return () => {
      document.body.style.position = 'unset';
      // eslint-disable-next-line no-console
      console.log('modal closed');
    };
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleProductModalClose();
      }
    }

    // Attach event listener to the window object
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={s.container}>
      <div className={s.product_modal} ref={ref}>
        <div className={s.product_modal__img}>
          <button
            type="button"
            className={s.product_modal__close}
            onClick={() => handleProductModalClose()}
          />
        </div>

        <div className={s.product_modal__content}>
          <div className={s.product_modal__content__title}>
            <h2 className={s.product_modal__content__name}>{selectedProduct.name}</h2>
            <p className={s.product_modal__content__price}>{`${selectedProduct.price} UAH`}</p>
          </div>

          <div className={s.product_modal__content__description}>
            <div className={s.product_modal__content__description__info}>
              <p className={s.product_modal__content__description__text}>
                {selectedProduct.description}
              </p>

              <div className={s.product_modal__content__description__weight}>
                <img
                  className={s.product_modal__content__description__weight__img}
                  src={weightLogo}
                  alt="weight"
                />
                <p className={s.product_modal__content__description__weight__text}>{`${selectedProduct.weight} g`}</p>
              </div>
            </div>

            <div className={s.product_modal__content__description__buttons}>
              <button
                type="button"
                className={s.product_modal__content__description__buttons__add}
              >
                Додати до кошика
              </button>
              <button
                type="button"
                className={s.product_modal__content__description__buttons__like}
              >
                <img src={heartLogo} alt="heart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
