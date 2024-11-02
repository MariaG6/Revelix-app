"use client";
import React, { useState, useRef } from "react";
import styles from "./Navbar.module.css";

import { removeJwtToken } from "@/api/route";
import { UserProfile } from "./UserProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null); // Referencia al elemento del perfil de usuario

  // Función para manejar el clic en el perfil de usuario
  const handleUserProfileClick = () => {
    setShowLogout(prevShowLogout => !prevShowLogout); // Alterna el estado de mostrar/ocultar el botón de cerrar sesión
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    console.log('Logging out');
    removeJwtToken(); // Elimina el token JWT
    router.push("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <nav className={styles.navbar}>
      {/* Enlace a la página de inicio */}
      <Link href="/" className={styles.homeLink}> Home </Link>

      {/* Perfil de usuario */}
      <div ref={profileRef} onClick={handleUserProfileClick}>
        <UserProfile />
      </div>

      {/* Botón de cerrar sesión */}
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
