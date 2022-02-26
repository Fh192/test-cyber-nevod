import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.sushisell.ru/v2/',
});
