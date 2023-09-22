/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import s from './EditProduct.module.scss';
import { PagePath } from '../../../../../../types/PagePath';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setPagePath, setPopupMessage } from '../../../../../../features/main/mainSlice';
import { ProductModel } from '../../../../../../models/ProductModel';
import ProductService from '../../../../../../api/services/ProductService';
import { ProductCategory } from '../../../../../../types/Products';
import { NotificationPopup } from '../../../../../../components/NotificationPopup/NotificationPopup';
import { getAndSetProducts } from '../../../../../../utils/functions/getAndSetProducts';
import { setCallProductsUpdate } from '../../../../../../features/products/productsSlice';

enum InputDataType {
  NAME = 'name',
  DESCRIPTION = 'description',
  PRICE = 'price',
  WEIGHT = 'weight',
  CATEGORY = 'category',
  PACKAGE_COST = 'packageCost',
  LIKES_COUNT = 'likesCount',
  IMAGE = 'image',
}

export const EditProduct: React.FC = () => {
  const product = useAppSelector((state) => state.products.selectedEditProduct);
  const images = useAppSelector((state) => state.products.images);

  const imageData = images.find((img) => img.productId === product.id)?.imageData;

  const [name, setName] = useState(product.name || '' as string);
  const [description, setDescription] = useState(product?.description || '' as string);
  const [price, setPrice] = useState(product?.price || 0 as number);
  const [weight, setWeight] = useState(product?.weight || 0 as number);
  const [category, setCategory] = useState(product.category || ProductCategory.GRILL as ProductCategory);
  const [likesCount, setLikesCount] = useState(product?.likesCount || 0 as number);
  const [packageCost, setPackageCost] = useState(product?.packageCost || 0 as number);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null as string | null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPagePath(PagePath.SETTINGS__MANAGEMENT__CREATE));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files === null) {
      return;
    }

    setImage(e.target.files[0]);

    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
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
    const { width, height } = imageEl.getBoundingClientRect();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    imageEl.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  };

  const checkData = () => {
    if (name.trim() === '') {
      dispatch(setPopupMessage({
        text: 'Введіть назву продукту!',
        success: false,
      }));

      return false;
    }

    if (description.trim() === '') {
      dispatch(setPopupMessage({
        text: 'Введіть опис продукту!',
        success: false,
      }));

      return false;
    }

    if (price === 0) {
      dispatch(setPopupMessage({
        text: 'Введіть ціну продукту!',
        success: false,
      }));

      return false;
    }

    if (weight === 0) {
      dispatch(setPopupMessage({
        text: 'Введіть вагу продукту!',
        success: false,
      }));

      return false;
    }

    if (packageCost === 0) {
      dispatch(setPopupMessage({
        text: 'Введіть ціну пакування продукту!',
        success: false,
      }));

      return false;
    }

    return true;
  };

  const handleDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitting...');

    try {
      checkData();

      if (!checkData()) {
        return;
      }

      const productData = {
        id: product.id,
        name,
        description,
        price,
        weight,
        category,
        count: 0,
        likesCount,
        packageCost,
      } as ProductModel;

      console.log(product);

      const newProduct = await ProductService.editProduct(productData);

      if (image) {
        await ProductService.changeProductImage('image', product.id, image as File);
      }

      dispatch(setPopupMessage({
        text: 'Продукт успішно змінено!',
        success: true,
      }));

      dispatch(setCallProductsUpdate());
    } catch (error) {
      console.log(error);

      dispatch(setPopupMessage({
        text: 'Помилка при зміні продукту!',
        success: false,
      }));
    }
  };

  return (
    <div className={s.create_product}>
      <NotificationPopup />

      <header className={s.create_product__header}>
        <h1 className={s.create_product__header__title}>Змінити продукт</h1>
      </header>

      <main className={s.create_product__main}>
        <form
          className={s.create_product__form}
          onSubmit={handleDataSubmit}
        >
          <div className={s.create_product__form__text_info}>
            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Назва продукту
                </span>
              </div>

              <input
                name={InputDataType.NAME}
                type="text"
                className={s.create_product__form__text_info__item__input}
                placeholder='Наприклад: "Піца Маргарита"'
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Вага продукту
                </span>
              </div>

              <input
                name={InputDataType.WEIGHT}
                type="number"
                className={s.create_product__form__text_info__item__input}
                placeholder="Наприклад: 500"
                required
                onChange={(e) => setWeight(Number(e.target.value))}
                value={weight}
              />
            </div>

            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Ціна пакування
                </span>
              </div>

              <input
                name={InputDataType.PACKAGE_COST}
                type="number"
                className={s.create_product__form__text_info__item__input}
                placeholder="Наприклад: 15"
                required
                onChange={(e) => setPackageCost(Number(e.target.value))}
                value={packageCost}
              />
            </div>

            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Кількість вподобань
                </span>
              </div>

              <input
                name={InputDataType.LIKES_COUNT}
                type="number"
                className={s.create_product__form__text_info__item__input}
                placeholder="Наприклад: 29"
                required
                onChange={(e) => setLikesCount(Number(e.target.value))}
                value={likesCount}
              />
            </div>

            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Ціна продукту
                </span>
              </div>

              <input
                name={InputDataType.PRICE}
                type="number"
                className={s.create_product__form__text_info__item__input}
                placeholder="Наприклад: 149"
                required
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
              />
            </div>

            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Категорія продукту
                </span>
              </div>

              <select
                name={InputDataType.CATEGORY}
                className={s.create_product__form__text_info__item__select}
                required
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                value={category}
              >
                <option value={ProductCategory.GRILL}>Гриль</option>
                <option value={ProductCategory.HOT_DISHES}>Гарячі страви</option>
                <option value={ProductCategory.COLD_DISHES}>Холодні страви</option>
                <option value={ProductCategory.DRINKS}>Напої</option>
                <option value={ProductCategory.DESSERTS}>Десерти</option>
                <option value={ProductCategory.SALADS}>Салати</option>
                <option value={ProductCategory.SOUPS}>Супи</option>
              </select>
            </div>

            <div className={s.create_product__form__text_info__item}>
              <div className={s.create_product__form__text_info__item__title}>
                <div className={s.create_product__form__text_info__item__title__dots}>
                  *
                </div>
                <span className={s.create_product__form__text_info__item__title__text}>
                  Опис продукту
                </span>
              </div>

              <textarea
                name={InputDataType.DESCRIPTION}
                className={s.create_product__form__text_info__item__textarea}
                rows={5}
                placeholder='Наприклад: "Запашна піца з сиром моцарела, томатами та базиліком"'
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <button
              type="submit"
              className={s.create_product__form__text_info__button_save}
            >
              Зберегти
            </button>
          </div>

          <div className={s.create_product__form__image}>
            <h1 className={s.create_product__form__image__title}>
              Завантажити фото
            </h1>

            <div className={s.create_product__form__image__content}>
              <div className={s.image_input}>
                <label htmlFor="image_input" className={s.image_input__label}>
                  {imagePreview !== null ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={s.image_input__preview}
                      onMouseEnter={handleImageScale}
                      onMouseLeave={handleImageScaleOut}
                      onMouseMove={handleImageMove}
                    />
                  ) : (
                    <img
                      src={`data:image/jpeg;base64,${imageData}`}
                      alt="Preview"
                      className={s.image_input__preview}
                      onMouseEnter={handleImageScale}
                      onMouseLeave={handleImageScaleOut}
                      onMouseMove={handleImageMove}
                    />
                  )}
                </label>
                <input
                  name={InputDataType.IMAGE}
                  id="image_input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={s.image_input__input}
                // required
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
