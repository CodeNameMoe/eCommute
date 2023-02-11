import React from "react";
import styles from "../navbar/navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const { push } = useRouter();

  const handleLogin = () => push("/api/auth/login");
  return (
    <nav className={styles.nav}>
      <Link className={styles.Link} href="/">
        <span className={styles.logo}>eCommute</span>
      </Link>
      <div>
        <ul className={styles.navLinks}>
          <li>
            <Link className={styles.navLink} href="/">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/">
              Blog
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/">
              Reviews
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/">
              Pricing
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.logoutSignUp}>
        <Link className={styles.logout} href="/">
          <span>Login</span>
        </Link>
        <button onClick={handleLogin}>Try For Free</button>
      </div>
    </nav>
  );
}

export default Navbar;
