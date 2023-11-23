import { AxiosError } from 'axios';
import { baseApi } from '@/api/base-api';
import { GeneralResponse, ProductI } from '@/interfaces';

const getAll = async (): Promise<[unknown, ProductI[] | null]> => {
  try {
    const res = await baseApi.get<GeneralResponse<ProductI[]>>('/products');

    return [null, res.data.data];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [error.response?.data?.message, null];
    }

    return [(error as Error).message, null];
  }
};

const getById = async (id: number): Promise<[unknown, ProductI | null]> => {
  try {
    const res = await baseApi.get<GeneralResponse<ProductI>>(`/products/${id}`);

    return [null, res.data.data];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [error.response?.data?.message, null];
    }

    return [(error as Error).message, null];
  }
};

export default {
  getAll,
  getById,
};
