import React, { useState } from 'react';
import { Login } from '../../components/Login/Login';
import { Button, Modal } from '../../components/shared';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.loginPage}>
      <Button onClick={openModal}>Войти</Button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2 className={styles.title}>Вход/регистрация</h2>
        <Login />
      </Modal>
    </div>
  );
};
