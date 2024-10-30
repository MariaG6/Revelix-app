'use client'
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import { useState } from "react";
import { setJwtToken } from "@/api/route";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        if (token) {
          setJwtToken(token);
          router.push("/");
          console.log("Welcome!");
        } else {
          setError("Token not found in response.");
          console.log("Token not found in response.");
        }
      } else {
        const errorMessage = `Login failed with status: ${response.status}`;
        setError(errorMessage);
        console.log("Log in Failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      setError("An error occurred while logging in. Please try again.");
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