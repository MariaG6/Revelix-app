import React from 'react';
import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loading;