import React from "react";
import styles from './Navbar.module.css';
import Image from "next/image";

export function UserProfile() {
  return (
    <div className={styles.circle}>
      <Image
        src="/man.svg"
        alt="user profile"
        width={38}
        height={38}
        className={styles.userImage}
      />
    </div>
  );
}
