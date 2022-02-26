import classNames from 'classnames/bind';
import React, { useState } from 'react';
import refreshImg from '../../../../assets/images/refresh.svg';
import { useDispatch } from '../../../../hooks';
import { getCaptcha } from '../../../../store/reducers/authSlice';
import styles from './RefreshCaptcha.module.scss';

export const RefreshCaptcha: React.FC = () => {
  const dispatch = useDispatch();
  const cn = classNames.bind(styles);

  const [spin, setSpin] = useState(false);

  const refreshCaptcha = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch(getCaptcha());

    setSpin(true);
  };

  return (
    <input
      className={cn(['refreshCaptcha', { spin }])}
      src={refreshImg}
      type='image'
      alt='refresh'
      disabled={spin}
      onClick={refreshCaptcha}
      onAnimationEnd={() => setSpin(false)}
    />
  );
};
