import React from 'react';
import styles from './AuthPage.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImg} />
      {children}
    </div>
  );
};

export default AuthLayout;