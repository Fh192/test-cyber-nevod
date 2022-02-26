import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from '../hooks';
import { LoginPage, ProductsPage } from '../pages';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const { access_token } = useSelector(s => s.auth);

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route
            path='*'
            element={<Navigate to={access_token ? '/products' : '/login'} />}
          />
        </Routes>
      </div>
    </div>
  );
};
