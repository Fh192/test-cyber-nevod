import classNames from 'classnames/bind';
import React from 'react';
import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'sm';
}

export const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'lg',
  children,
  ...props
}) => {
  const cn = classNames.bind(styles);

  return (
    <button className={cn(['button', variant, size])} {...props}>
      {children}
    </button>
  );
};
