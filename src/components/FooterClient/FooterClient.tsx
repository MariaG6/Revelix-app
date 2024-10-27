import React from 'react';
import styles from './FooterClient.module.css';

function FooterClient() {
  return (
    <div className={styles.footer}>
      <div className={styles.column}>Column 1</div>
      <div className={styles.column}>Column 2</div>
      <div className={styles.column}>Column 3</div>
    </div>
  );
}

export default FooterClient;