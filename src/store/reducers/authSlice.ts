import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { authApi } from '../../api/authApi';
import { IAuthState, ICallData, ILoginErrorResponse } from '../../types/auth';

const initialState: IAuthState = {
  phone: '',
  captcha: '',
  access_token: localStorage.getItem('access_token') || null,
  errors: {
    phone: null,
    captcha: null,
    confirm: null,
  },
};

export const getCaptcha = createAsyncThunk<string, void>(
  'auth/getCaptcha',
  async () => {
    const captcha = await authApi.getCaptcha();
    return captcha;
  }
);

export const call = createAsyncThunk<
  string,
  ICallData,
  { rejectValue: ILoginErrorResponse }
>('auth/call', async (data, { rejectWithValue }) => {
  try {
    const phone = await authApi.call(data);

    return phone;
  } catch (err) {
    const error = err as ILoginErrorResponse;
    console.log(error);
    return rejectWithValue(error);
  }
});

export const confirmPhone = createAsyncThunk<
  string,
  number,
  { state: RootState; rejectValue: ILoginErrorResponse }
>('auth/confirm', async (code: number, { getState, rejectWithValue }) => {
  try {
    const { phone } = getState().auth;
    const access_token = await authApi.confirm({ code, phone });

    return access_token;
  } catch (err) {
    const error = err as ILoginErrorResponse;

    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeAuthError: (
      state,
      action: PayloadAction<keyof IAuthState['errors']>
    ) => {
      state.errors[action.payload] = null;
    },
  },
  extraReducers: b => {
    b.addCase(getCaptcha.fulfilled, (state, action) => {
      state.captcha = action.payload;
    });

    b.addCase(call.fulfilled, (state, action) => {
      state.phone = action.payload;
    });

    b.addCase(call.rejected, (state, action) => {
      console.log(action);
      if (action.payload) {
        const { errors } = action.payload;
        const { code, phone } = errors;

        if (code) state.errors.captcha = code[0];
        if (phone) state.errors.phone = phone[0];
      }
    });

    b.addCase(confirmPhone.fulfilled, (state, action) => {
      state.access_token = action.payload;
      localStorage.setItem('access_token', action.payload);
    });

    b.addCase(confirmPhone.rejected, (state, action) => {
      if (action.payload) {
        const { errors } = action.payload;

        if (errors.code) {
          state.errors.confirm = errors.code[0];
        }
      }
    });
  },
});

export const { removeAuthError } = authSlice.actions;
