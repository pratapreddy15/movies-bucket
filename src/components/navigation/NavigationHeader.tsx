"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { navigate } from "@/utils/actions";
import { IoLogoBitbucket } from "react-icons/io5";

import Modal from "@/components/modal/Modal";
import NavLink from "@/components/navigation/NavLink";
import ChangeCountry from "@/components/change-country/ChangeCountry";
import { getCachedCountry, cacheCountry } from "@/utils/sessionStorage";
import { appConfig } from "@/constants/config";
import styles from "./NavigationHeader.module.css";

function NavigationHeader() {
  const [showChangeCountryModal, setShowChangeCountryModal] = useState(false);
  const [activeCountry, setActiveCountry] = useState(appConfig.defaultActiveCountry);

  useEffect(() => {
    const cachedCountry = getCachedCountry();
    if (cachedCountry && cachedCountry.code) {
      setActiveCountry(cachedCountry);
    }
  }, []);

  const closeChangeCountryDialogHandler = useCallback(() => {
    setShowChangeCountryModal(false);
  }, []);

  const setCountryCodeHandler = useCallback((code: string, name: string) => {
    setActiveCountry({ code, name });
    setShowChangeCountryModal(false);
    cacheCountry({ code, name });
    navigate();
  }, []);

  return (
    <>
      {showChangeCountryModal && (
        <Modal>
          <ChangeCountry onDialogClose={closeChangeCountryDialogHandler} onSelectCountry={setCountryCodeHandler} />
        </Modal>
      )}
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
              <div className={styles.country}>
                <span>Country: {activeCountry.code}</span>
                <span onClick={() => setShowChangeCountryModal(true)}>Change</span>
              </div>
            </div>
          </div>
        </header>
      </nav>
    </>
  );
}

export default NavigationHeader;
