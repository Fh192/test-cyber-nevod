import React from 'react';
import { IProduct } from '../../../types/products';
import { Button } from '../../shared';
import { NutritionalValue } from './NutritionalValue/NutritionalValue';
import styles from './Product.module.scss';

export const Product: React.FC<IProduct> = ({
  image,
  name,
  price,
  discount,
  weight,
  calories,
  fats,
  carbohydrates,
  proteins,
}) => {
  const nutritionalValue = { weight, calories, fats, carbohydrates, proteins };
  const priceBeforeDiscount = (price / (1 - discount / 100)).toFixed(0);

  return (
    <li className={styles.product}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.inner}>
        <span className={styles.name}>{name}</span>
        <NutritionalValue {...nutritionalValue} />
      </div>
      <div className={styles.priceWrap}>
        <span className={styles.price}>{price} ₽</span>
        {!!discount && (
          <del className={styles.priceBeforeDiscount}>
            {priceBeforeDiscount} ₽
          </del>
        )}
      </div>
      <Button size='sm'>Заказать</Button>
    </li>
  );
};
