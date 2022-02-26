import React, { useState } from 'react';
import { Confirm } from './Confirm/Confirm';
import { LoginForm } from './LoginForm/LoginForm';

export const Login: React.FC = () => {
  const [confirmMode, setConfirmMode] = useState(false);

  return (
    <>
      {confirmMode ? (
        <Confirm setConfirmMode={setConfirmMode} />
      ) : (
        <LoginForm setConfirmMode={setConfirmMode} />
      )}
    </>
  );
};
