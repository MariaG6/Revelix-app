import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h3>About Us</h3>
        <i>
          We are a leading film streaming service, offering a wide variety of
          movies and TV shows for all tastes.
        </i>
      </div>
      <div className={styles.column}>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a target='_blank' href="https://driverevel.com/">Do you need a ride?</a>
          </li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>Contact Us</h3>
        <p>
          Email: <a href="mailto:support@revelix.com">support@revelix.com</a>
        </p>
        <p>
          Phone: <a href="tel:+1234567890">+1 234 567 890</a>
        </p>
      </div>
    </footer>
  );
}