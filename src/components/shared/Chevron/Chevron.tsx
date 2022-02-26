import classNames from 'classnames/bind';
import React from 'react';
import chevronLeft from '../../../assets/images/chevronLeft.svg';
import chevronRight from '../../../assets/images/chevronRight.svg';
import styles from './Chevron.module.scss';

interface Props {
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}

export const Chevron: React.FC<Props> = ({ direction, disabled, onClick }) => {
  const cn = classNames.bind(styles);
  const chevronIcon = direction === 'left' ? chevronLeft : chevronRight;

  return (
    <input
      className={cn(['chevron', direction])}
      type='image'
      src={chevronIcon}
      alt={direction}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
