import React from "react";
import styles from "../AuthPage.module.css";

import LoginForm from "./LoginForm/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className={styles.formContainer}>
      <p className={styles.formTitle}>Welcome back!</p>
      <LoginForm /> 
      <Link href="/login" className={styles.formText}>
        Forgot Password?
      </Link>
    </div>
  );
}
