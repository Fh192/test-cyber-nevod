import classNames from 'classnames/bind';
import React from 'react';
import styles from './Field.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string | null;
  dontShowErrorMsg?: boolean;
}

export const Field: React.FC<Props> = ({
  id,
  label,
  error,
  placeholder,
  dontShowErrorMsg,
  ...props
}) => {
  const cn = classNames.bind(styles);

  return (
    <div className={cn(['field', { error }])}>
      <input id={id} placeholder={placeholder || ' '} {...props} />
      <label htmlFor={id}>{(!dontShowErrorMsg && error) || label}</label>
    </div>
  );
};
