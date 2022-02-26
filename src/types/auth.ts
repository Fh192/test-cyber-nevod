export interface IAuthState {
  phone: string;
  captcha: string;
  access_token: string | null;
  errors: {
    phone: null | string;
    captcha: null | string;
    confirm: null | string;
  };
}

export interface IGetCaptchaResponse {
  data: {
    image: string;
  };
}

export interface ILoginForm {
  phone: string;
  captcha: string;
  agreementAccepted: boolean;
}

export interface ICallData {
  phone: string;
  code: string;
}

export interface IConfirmData {
  phone: string;
  code: number;
}

export interface IConfirmPhoneResponse {
  data: { status: boolean; access_token: string };
}

export interface ILoginErrorResponse {
  errors: { code?: [string]; phone?: [string] };
}
