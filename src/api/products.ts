/* eslint-disable max-len */
import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/products';
const BASE_URL = 'https://food-delivery-server-1.onrender.com/products';

// const $api = axios.create({
//   withCredentials: true,
//   baseURL: BASE_URL,
// });

export const getProducts = async () => {
  const response = await axios.get(BASE_URL);

  return response.data;
};

export const getProductsChunk = async (page: number, itemsPerPage: number, filter: string, searchQuery: string) => {
  const response = await axios.get(`${BASE_URL}/chunk`, {
    params: {
      page,
      itemsPerPage,
      filter,
      searchQuery,
    },
  });

  return response.data;
};

export const getProductsLength = async (filter: string, searchQuery: string) => {
  const response = await axios.get(`${BASE_URL}/length`, {
    params: {
      filter,
      searchQuery,
    },
  });

  return response.data;
};
