"use client";

import Link from "next/link";
import { IoLogoBitbucket } from "react-icons/io5";

import NavLink from "@/components/navigation/NavLink";
import styles from "./NavigationHeader.module.css";

function NavigationHeader() {
  return (
    <nav className={styles.nav}>
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.appLogo}>
            <Link href="/">
              <span>Movies</span>
              <span> </span>
              <span className={styles.logo}>
                <IoLogoBitbucket />
              </span>
            </Link>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/browse">Browse</NavLink>
            </li>
            <li>
              <NavLink href="/buckets">Buckets</NavLink>
            </li>
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
            <li>
              <NavLink href="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <div className={styles.actions}>
            <div className={styles.signInLink}>
              <NavLink href="/sign-in">Sign In</NavLink>
            </div>
            <div className={styles.registerLink}>
              <NavLink href="/register">Register</NavLink>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default NavigationHeader;
