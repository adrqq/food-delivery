/* eslint-disable no-console */
/* eslint-disable max-len */
// import { AxiosResponse } from 'axios';
import $api from '../../http';
import { ProductModel } from '../../models/ProductModel';
import { CartModel } from '../../models/CartModel';

export default class ProductService {
  static async getProducts() {
    const response = await $api.get('/products');

    return response.data;
  }

  static async getProductsChunk(page: number, itemsPerPage: number, filter: string, searchQuery: string): Promise<ProductModel[]> {
    const response = await $api.get('/products/chunk', {
      params: {
        page,
        itemsPerPage,
        filter,
        searchQuery,
      },
    });

    return response.data;
  }

  static async getProductsLength(filter: string, searchQuery: string) {
    const response = await $api.get('/products/length', {
      params: {
        filter,
        searchQuery,
      },
    });

    return response.data;
  }

  static async addProductToUserCart(userId: string, product: ProductModel) {
    const response = await $api.post('/products/user/cart/add', {
      userId,
      product,
    });

    return response.data;
  }

  static async removeProductFromUserCart(userId: string, productId: number) {
    const response = await $api.post('/products/user/cart/remove', {
      userId,
      productId,
    });

    return response.data;
  }

  static async getProductsFromUserCart(userId: string): Promise<CartModel> {
    const response = await $api.get('/products/user/cart', {
      params: {
        userId,
      },
    });

    return response.data;
  }

  static async deleteProductFromUserCart(userId: string, productId: number) {
    const response = await $api.post('/products/user/cart/delete', {
      userId,
      productId,
    });

    return response.data;
  }

  static async getProductImage(productId: number) {
    const response = await $api.get('/products/image/get', {
      params: {
        productId,
      },
    });

    return response.data;
  }

  static async addProductImage(name: string, productId: number, image: File) {
    console.log('addProductImage', name, productId, image);
    const formData = new FormData();

    formData.append('name', name);
    formData.append('productId', productId.toString());
    formData.append('image', image);

    const response = await $api.post('/products/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  static async changeProductImage(name: string, productId: number, image: File) {
    console.log('changeProductImage', name, productId, image);
    const formData = new FormData();

    formData.append('name', name);
    formData.append('productId', productId.toString());
    formData.append('image', image);

    const response = await $api.post('/products/image/change', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  static async addProduct(product: ProductModel) {
    const response = await $api.post('/products/add', product);

    return response.data;
  }

  static async editProduct(product: ProductModel) {
    const response = await $api.post('/products/edit', product);

    return response.data;
  }

  static async deleteProduct(productId: number) {
    const response = await $api.post('/products/delete', { productId });

    return response.data;
  }
}
