import {
  ICallData,
  IConfirmData,
  IConfirmPhoneResponse,
  IGetCaptchaResponse,
} from '../types/auth';
import { api } from './instance';

export const authApi = {
  getCaptcha: async () => {
    const response = await api.get<IGetCaptchaResponse>(`auth/captcha`);
    const { data } = response.data;

    return data.image;
  },

  call: async (data: ICallData) => {
    const response = await api.post<{ data: { status: boolean } }>(
      `auth`,
      data
    );

    if (response.data.data.status) {
      return data.phone;
    } else {
      throw response.data.data;
    }
  },

  confirm: async (data: IConfirmData) => {
    const response = await api.post<IConfirmPhoneResponse>(`confirm`, {
      ...data,
      guid: '2182b0cb-e0f7-442d-9d92-5b3424709645',
      os_type: 'iOS',
      app_version: 'v1',
    });

    if (response.data.data.status) {
      return response.data.data.access_token;
    } else {
      throw response.data.data;
    }
  },
};
