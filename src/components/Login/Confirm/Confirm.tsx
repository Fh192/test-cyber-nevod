import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountdown, useDispatch, useSelector } from '../../../hooks';
import {
  confirmPhone,
  removeAuthError,
} from '../../../store/reducers/authSlice';
import { Button, Field } from '../../shared';
import styles from './Confirm.module.scss';

interface Props {
  setConfirmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Confirm: React.FC<Props> = ({ setConfirmMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors } = useSelector(s => s.auth);
  const [code, setCode] = useState('');
  const countdown = useCountdown(60, 0);

  const goBack = () => {
    setConfirmMode(false);
  };

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);

    if (errors.confirm) {
      dispatch(removeAuthError('confirm'));
    }
  };

  useEffect(() => {
    if (code.length >= 4) {
      dispatch(confirmPhone(+code)).then(({ meta: { requestStatus } }) => {
        if (requestStatus === 'fulfilled') {
          navigate('/products');
        }
      });
    }
  }, [code, dispatch, navigate]);

  return (
    <div className={styles.confirm}>
      <span className={styles.text}>
        Введите последние 4 цифры номера входящего звонка
      </span>
      <div className={styles.field}>
        <label htmlFor='phoneConfirm'>+7 (999) 999</label>
        <Field
          type='number'
          id='phoneConfirm'
          placeholder='_ _ - _ _'
          maxLength={4}
          autoFocus={true}
          dontShowErrorMsg={true}
          error={errors.confirm}
          value={code}
          onChange={onCodeChange}
        />
      </div>

      <span className={styles.countdown}>
        Позвонить ещё раз через {countdown} сек.
      </span>

      <Button variant='secondary' onClick={goBack}>
        Вернуться назад
      </Button>
    </div>
  );
};
