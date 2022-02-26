import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../hooks';
import {
  call,
  getCaptcha,
  removeAuthError,
} from '../../../store/reducers/authSlice';
import { ILoginForm } from '../../../types/auth';
import { transformPhoneNumber } from '../../../utils';
import { Button } from '../../shared';
import { Agreement } from './Agreement/Agreement';
import { CaptchaField } from './CaptchaField/CaptchaField';
import styles from './LoginForm.module.scss';
import { PhoneField } from './PhoneField/PhoneField';

interface Props {
  setConfirmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm: React.FC<Props> = ({ setConfirmMode }) => {
  const dispatch = useDispatch();

  const { errors } = useSelector(s => s.auth);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [form, setForm] = useState<ILoginForm>({
    phone: '',
    captcha: '',
    agreementAccepted: false,
  });

  const formChangeHelper = (key: keyof ILoginForm) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let value: string | boolean;
      const isCheckbox = e.target.type === 'checkbox';
      const isPhone = e.target.name === 'phone';

      if (isCheckbox) {
        value = e.target.checked;
      } else if (isPhone) {
        value = transformPhoneNumber(e.target.value);
      } else {
        value = e.target.value;
      }

      if (errors.captcha) {
        dispatch(removeAuthError('captcha'));
      }

      setForm(form => ({ ...form, [key]: value }));
    };
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phone = form.phone.replaceAll(/\D/g, '');
    const { meta } = await dispatch(call({ phone, code: form.captcha }));

    if (meta.requestStatus === 'fulfilled') {
      setConfirmMode(true);
    } else {
      dispatch(getCaptcha());
    }
  };

  const checkFormValidity = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitDisabled(!e.currentTarget.checkValidity());
  };

  useEffect(() => {
    dispatch(getCaptcha());
  }, [dispatch]);

  return (
    <form
      className={styles.loginForm}
      onSubmit={onSubmit}
      onChange={checkFormValidity}
    >
      <span className={styles.text}>Введите номер своего телефона</span>
      <PhoneField value={form.phone} onChange={formChangeHelper('phone')} />
      <span className={styles.text}>
        После нажатия на кнопку вам поступит звонок. Отвечать на звонок не нужно
      </span>
      <CaptchaField
        value={form.captcha}
        onChange={formChangeHelper('captcha')}
      />
      <Button disabled={submitDisabled}>Позвонить мне</Button>
      <Agreement
        checked={form.agreementAccepted}
        onChange={formChangeHelper('agreementAccepted')}
      />
    </form>
  );
};
