/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import s from './ProductPage.module.scss';
import { Direction } from '../../components/Direction';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPagePath, setShowAddedNotification } from '../../features/main/mainSlice';
import productTEST from '../../images/food_photos/productPageTEST.png';
import { Example } from '../../hooks';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import arrow from '../../images/logos/arrow-left-orange.svg';
import cartIcon from '../../images/logos/bag-add.svg';
import { PcAddButtons } from '../../components/PcAddButtons';
import { ProductModel } from '../../models/ProductModel';
import { calculateCartInfo } from '../../features/products/productsSlice';

import { addProductToLocalCartUtil } from '../../utils/functions/addProductToLocalCartUtil';
import { addProductToUserCartUtil } from '../../utils/functions/addProductToUserCartUtil';

export const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMobileMini } = Example();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const images = useAppSelector((state) => state.products.images);
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);
  const isUserAuth = useAppSelector((state) => state.users.isUserAuth);
  const userCart = useAppSelector((state) => state.products.userCart);
  const user = useAppSelector((state) => state.users.user);

  const image = images.find((item) => item.productId === selectedProduct.id)?.imageData;

  SwiperCore.use([Navigation]);

  useEffect(() => {
    if (!selectedProduct) {
      navigate('/home');
    }

    dispatch(setPagePath('/home/product'));
  }, []);

  const handleNext = () => {
    // scroll element to the right

    const element = document.querySelector('.swiper-wrapper') as HTMLDivElement;

    if (element) {
      element.scrollBy({
        left: 400,
        behavior: 'smooth',
      });
    }
  };

  const handleImageScale = (e: React.MouseEvent<HTMLImageElement>) => {
    const imageEl = e.target as HTMLImageElement;

    imageEl.style.transform = 'scale(1.3)';
  };

  const handleImageScaleOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const imageEl = e.target as HTMLImageElement;

    imageEl.style.transform = 'scale(1)';
  };

  const handleImageMove = (e: React.MouseEvent) => {
    const imageEl = e.target as HTMLImageElement;

    const {
      left,
      top,
      width,
      height,
    } = imageEl.getBoundingClientRect();

    const x = (e.pageX - left) / width;
    const y = (e.pageY - top) / height;

    imageEl.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  const findProductInCart = () => {
    if (!isUserAuth) {
      if (localStorage.getItem('cart') === null) {
        return false;
      }

      const cart = JSON.parse(localStorage.getItem('cart') as string);

      const isProductInCart = cart.find((item: ProductModel) => item.id === selectedProduct.id);

      if (isProductInCart?.count >= 1) {
        return isProductInCart;
      }

      return isProductInCart;
    }

    return userCart.find((item: ProductModel) => item?.id === selectedProduct?.id);
  };

  const handleAddProductToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isUserAuth) {
      addProductToLocalCartUtil(dispatch, selectedProduct);
    } else {
      addProductToUserCartUtil(dispatch, user, selectedProduct);
    }

    dispatch(setShowAddedNotification(true));

    setTimeout(() => {
      dispatch(setShowAddedNotification(false));
    }, 1500);

    dispatch(calculateCartInfo({ userCart, isUserAuth }));
  };

  return (
    <div className={s.product_page}>
      <Direction />

      <div className={s.product}>
        <div className={s.product__image__wrapper}>
          <img
            className={s.product__image}
            src={`data:image/jpeg;base64,${image}`}
            alt="product"
            onMouseEnter={handleImageScale}
            onMouseLeave={handleImageScaleOut}
            onMouseMove={handleImageMove}
          />
        </div>

        <div className={s.product__content}>
          <div className={s.product__content__name}>{selectedProduct.name}</div>
          <div className={s.product__content__ingredients}>
            <span className={s.product__content__ingredients__weight}>
              {`${selectedProduct?.weight} гр`}
            </span>
          </div>

          <div className={s.product__content__description}>
            {` ${selectedProduct?.description?.slice(0, 270)}...`}
          </div>

          <span className={s.product__content__good_with}>
            Смакує з:
          </span>

          <div className={s.swiper_buttons}>
            <div className={s.swiper_buttons__block}>
              <button
                type="button"
                ref={navigationPrevRef}
                className={s.swiper_buttons__block__arrow}
              >
                <img
                  className={s.swiper_buttons__block__arrow__left}
                  src={arrow}
                  alt="arrowLeft"
                />
              </button>
              <button
                type="button"
                ref={navigationNextRef}
                className={s.swiper_buttons__block__arrow}
                onClick={handleNext}
              >
                <img
                  className={s.swiper_buttons__block__arrow__right}
                  src={arrow}
                  alt="arrowRight"
                />
              </button>
            </div>
          </div>

          <div className={s.product__content__carousel}>
            <Swiper
              spaceBetween={10}
              slidesPerView={isMobileMini ? 3 : 4}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
            >
              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={s.product_card_mini}>
                  <div className={s.product_card_mini__image__wrapper}>
                    <img
                      src={productTEST}
                      alt="product"
                      className={s.product_card_mini__image}
                    />
                  </div>

                  <div className={s.product_card_mini__content}>
                    <div className={s.product_card_mini__content__name}>Добавка...</div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className={s.product__content__bottom}>
            {/* <button
              type="button"
              className={s.product__content__bottom__button}
            >
              <img
                className={s.product__content__bottom__button__icon}
                src={cartIcon}
                alt="cart_icon"
              />
              <p className={s.product__content__bottom__button__text}>
                В кошик
              </p>
            </button> */}

            {!(findProductInCart()?.count > 0) ? (
              <button
                type="button"
                className={s.product__content__bottom__button}
                onClick={(e) => (handleAddProductToCart(e))}
              >
                <img
                  className={s.product__content__bottom__button__icon}
                  src={cartIcon}
                  alt="cart_icon"
                />

                <p className={s.product__content__bottom__button__text}>
                  В кошик
                </p>
              </button>
            ) : (
              <PcAddButtons product={selectedProduct} />
            )}

            <div className={s.product__content__bottom__price}>{`${selectedProduct.price} ₽`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
