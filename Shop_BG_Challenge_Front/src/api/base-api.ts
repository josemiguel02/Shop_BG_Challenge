import axios from 'axios';
import { CONSTANTS } from '@/constants';

export const baseApi = axios.create({
  baseURL: `${CONSTANTS.BASE_URL}/api`,
});
