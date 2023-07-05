/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import s from './HomePage.module.scss';

import grillPhoto from '../../images/food_photos/grill-photo.jpg';

export const HomePage: React.FC = () => {
  const slides = [];

  return (
    <main className={s.home_page}>
      <img
        src={grillPhoto}
        alt="grillPhoto"
        className={s.home_page__img}
      />
    </main>
  );
};
