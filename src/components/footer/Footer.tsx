import Link from "next/link";
import { IoChatboxSharp, IoLogoLinkedin, IoCodeSlashOutline } from "react-icons/io5";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.footerItem}>
          <Link className={styles.footerLink} href="/contact-me">
            <div className={styles.icon}>
              <IoChatboxSharp />
            </div>
            <div className={styles.label}>
              <span>Contact Me</span>
            </div>
          </Link>
        </div>
        <div className={styles.footerItem}>
          <Link className={styles.footerLink} target="_blank" href="https://linkedin.com/in/pratapreddy15">
            <div className={styles.icon}>
              <IoLogoLinkedin />
            </div>
            <div className={styles.label}>
              <span>My profile</span>
            </div>
          </Link>
        </div>
        <div className={styles.footerItem}>
          <Link className={styles.footerLink} target="_blank" href="https://github.com/pratapreddy15/movies-bucket">
            <div className={styles.icon}>
              <IoCodeSlashOutline />
            </div>
            <div className={styles.label}>
              <span>Source Code</span>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>&copy;</span>
        <span> </span>
        <span>Movies Bucket</span>
      </div>
    </footer>
  );
}

export default Footer;
