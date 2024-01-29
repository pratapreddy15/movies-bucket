import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavLink.module.css";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const linkStyles = [styles.navLink];
  const path = usePathname();

  if (path === href) {
    linkStyles.push(styles.active);
  }

  return (
    <Link className={linkStyles.join(" ")} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
