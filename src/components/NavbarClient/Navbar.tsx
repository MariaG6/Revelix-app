"use client";
import React, { useState, useRef } from "react";
import styles from "./NavBar.module.css";

import { removeJwtToken } from "@/api/route";
import { UserProfile } from "./UserProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function NavbarClient() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleUserProfileClick = () => {
    setShowLogout(prevShowLogout => !prevShowLogout);
  };

  const handleLogout = () => {
    console.log('Logging out');
    removeJwtToken();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.homeLink}> Home </Link>
      <div ref={profileRef} onClick={handleUserProfileClick}>
        <UserProfile />
      </div>

      {showLogout && (
        <div className={styles.btnContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
