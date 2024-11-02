'use client'
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import { useState } from "react";
import { login } from "@/api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter(); 

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); 

    try {
      await login(email, password); // Llama a la función de inicio de sesión
      router.push("/"); // Redirige al usuario a la página principal
      console.log("Welcome!"); // Muestra un mensaje de bienvenida en la consola
    } catch (error) {
      console.error("An error occurred while logging in:", error); 
      if (error instanceof Error) {
        setError(error.message || "An error occurred while logging in. Please try again."); 
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <input
        placeholder="Username"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required
      />
      <input
        placeholder="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className={styles.error}>{error}</div>} 
      <button type="submit">Login</button> 
    </form>
  );
}