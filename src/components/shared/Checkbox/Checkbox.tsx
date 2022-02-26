import React from 'react';
import styles from './Checkbox.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<Props> = ({ ...props }) => {
  return (
    <label className={styles.checkbox}>
      <input type='checkbox' {...props} />
    </label>
  );
};
