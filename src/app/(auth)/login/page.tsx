import React from "react";
import styles from "../AuthPage.module.css";

import LoginForm from "./LoginForm/LoginForm";
import Link from "next/link";

// Componente de la página de inicio de sesión
export default function LoginPage() {
  return (
    <div className={styles.formContainer}>
      <p className={styles.formTitle}>Welcome back!</p> {/* Título del formulario */}
      <LoginForm /> 
      <Link href="/login" className={styles.formText}>
        Forgot Password?
      </Link> {/* Enlace para recuperar la contraseña */}
    </div>
  );
}
