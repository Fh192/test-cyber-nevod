import React from 'react';
import closeImg from '../../../assets/images/close.svg';
import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Modal: React.FC<Props> = ({ setIsOpen, isOpen, children }) => {
  const onClose = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <input
        className={styles.close}
        src={closeImg}
        type='image'
        alt='close'
        onClick={onClose}
      />
      {children}
    </div>
  );
};
