import React from 'react';
import { useSelector } from '../../../../hooks';
import { Field } from '../../../shared';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhoneField: React.FC<Props> = ({ value, onChange }) => {
  const { errors } = useSelector(s => s.auth);

  return (
    <Field
      type='tel'
      label='Номер телефона'
      id='phone'
      name='phone'
      autoComplete='off'
      autoFocus={true}
      required={true}
      maxLength={18}
      minLength={18}
      error={errors.phone}
      value={value}
      onChange={onChange}
    />
  );
};
