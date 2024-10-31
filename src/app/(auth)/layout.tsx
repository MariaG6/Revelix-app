import React from 'react';
import styles from './AuthPage.module.css';
import { AuthLayoutProps } from '../types';


const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className={styles.backgroundImg} />
      {children}
    </div>
  );
};

export default AuthLayout;