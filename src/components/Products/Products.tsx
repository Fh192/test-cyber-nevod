import React from 'react';
import { useSelector } from '../../hooks';
import { IProduct } from '../../types/products';
import { Preloader } from '../shared';
import { Product } from './Product/Product';
import styles from './Products.module.scss';

interface Props {
  products: IProduct[];
}

export const Products: React.FC<Props> = ({ products }) => {
  const {fetching} = useSelector(s => s.products);

  return (
    <ul className={styles.products}>
      {products.map(product => (
        <Product {...product} key={product.id} />
      ))}
      {fetching && <Preloader />}
    </ul>
  );
};
