"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./NavBar.module.css";

import { removeJwtToken } from "@/api/route";
import { UserProfile } from "./UserProfile";
import { useRouter } from "next/navigation";

export function NavbarClient() {
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); 

  const handleUserProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log('Logging out');
    removeJwtToken();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div onClick={handleUserProfileClick} ref={logoutRef}>
       <UserProfile />
      </div>
      <div className={styles.btnContainer} >
        {showLogout && (
          <button className={styles.logoutButton} onClick={handleLogout} >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
