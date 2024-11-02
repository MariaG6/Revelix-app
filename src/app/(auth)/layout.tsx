import React from 'react';
import styles from './AuthPage.module.css';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className={styles.backgroundImg} /> {/* Imagen de fondo en login page */}
      {children}
    </div>
  );
};

export default AuthLayout;