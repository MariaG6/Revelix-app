import React from "react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
    <div>
      <Link href="/" className={styles.homeLink}>
        Home
      </Link>
    </div>
    <div className={styles.circle}>
    <Image
        src="/images/man.svg"
        alt="user profile"
        width={38}
        height={38}
        className={styles.userImage}
      />
      </div>
  </nav>
  );
}

// Más de un valor className={`${styles.mobile} ${styles.mobile}`}
// Un valor className={styles.desktop}
