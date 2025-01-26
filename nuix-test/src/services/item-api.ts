import axios from 'axios';
import { API_BASE_URL } from '../util/common';

export const fetchItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/items`);
  return response.data;
};