import React from 'react';
import { useSelector } from '../../../../hooks';
import { Field } from '../../../shared';
import { RefreshCaptcha } from '../RefreshCaptcha/RefreshCaptcha';
import styles from './CaptchaField.module.scss';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CaptchaField: React.FC<Props> = ({ value, onChange }) => {
  const { captcha, errors } = useSelector(s => s.auth);

  return (
    <div className={styles.captchaWrap}>
      <RefreshCaptcha />
      <img src={captcha} alt='captcha' className={styles.captcha} />
      <Field
        type='text'
        label='Введите капчу'
        id='captcha'
        autoComplete='off'
        required={true}
        error={errors.captcha}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
