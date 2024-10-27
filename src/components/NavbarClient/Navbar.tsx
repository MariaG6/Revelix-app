import React from "react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import Link from "next/link";

export function NavbarClient() {
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

