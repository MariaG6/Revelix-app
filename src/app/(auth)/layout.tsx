import React from 'react';
import styles from './AuthPage.module.css';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className={styles.backgroundImg} />
      {children}
    </div>
  );
};

export default AuthLayout;