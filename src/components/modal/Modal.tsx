import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const modalContainer = document.getElementById("modalContainer");

  if (!modalContainer) {
    throw new Error("Element for mounting portal not found in the document");
  }

  return mounted
    ? createPortal(
        <>
          <div className={styles.overlay}></div>
          <div className={styles.modal}>{children}</div>
        </>,
        modalContainer
      )
    : null;
}

export default Modal;
