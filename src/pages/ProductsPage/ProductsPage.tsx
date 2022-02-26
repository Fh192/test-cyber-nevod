import React, { useEffect } from 'react';
import { Products } from '../../components/Products/Products';
import { Slider } from '../../components/Products/Slider/Slider';
import { useDispatch, useSelector } from '../../hooks';
import { getProducts } from '../../store/reducers/productsSlice';
import styles from './ProductsPage.module.scss';

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(s => s.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={styles.productsPage}>
      <h2 className={styles.title}>Может, ещё кое-что?</h2>
      <Slider itemWidthInPx={218}>
        <Products products={products} />
      </Slider>
    </div>
  );
};
