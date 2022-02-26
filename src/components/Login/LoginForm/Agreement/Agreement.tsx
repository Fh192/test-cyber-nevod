import React from 'react';
import { Checkbox } from '../../../shared';
import styles from './Agreement.module.scss';

interface Props {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Agreement: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <div className={styles.agreement}>
      <Checkbox required={true} checked={checked} onChange={onChange} />
      <p>
        Нажимая на кнопку, вы даете согласие на обработку{' '}
        <a
          className={styles.link}
          href='https://www.cyber-nevod.ru/politika/'
          target='_blank'
          rel='noreferrer'
        >
          персональных данных
        </a>{' '}
        и принимаете условия онлайн заказа на изготовление и доставку блюд
      </p>
    </div>
  );
};
