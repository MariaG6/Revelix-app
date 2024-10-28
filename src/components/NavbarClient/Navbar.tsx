'use client'
import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { UserProfile } from "./Userprofile";

export function NavbarClient() {
  const [showLogout, setShowLogout] = useState(false);

  const handleUserProfileClick = () => {
    setShowLogout(!showLogout);
    console.log("User profile clicked");	
  };

  return (
    <nav className={styles.navbar}>
      <div onClick={handleUserProfileClick}>
        <UserProfile />
      </div>
      {showLogout && <button className={styles.logoutButton}>Log Out</button>}
    </nav>
  );
}

