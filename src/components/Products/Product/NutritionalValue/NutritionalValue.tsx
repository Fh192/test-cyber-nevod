import React from 'react';
import { INutritionalValue } from '../../../../types/products';
import styles from './NutritionalValue.module.scss';

export const NutritionalValue: React.FC<INutritionalValue> = ({
  weight,
  calories,
  fats,
  carbohydrates,
  proteins,
}) => {
  return (
    <div className={styles.nutritionalValue}>
      <span>
        Энерг. ценность:<b> {calories}</b>ккал
      </span>
      <span>
        Вес: <b> {weight}</b>гр
      </span>
      <span>
        Жиры: <b> {fats}</b>г
      </span>
      <span>
        Углеводы: <b> {carbohydrates}</b>г
      </span>
      <span>
        Белки: <b> {proteins}</b>г
      </span>
    </div>
  );
};
