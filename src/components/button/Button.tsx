import styles from "./Button.module.css";

type ButtonProps = {
  mode: "primary" | "secondary";
  extraStyles?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, mode, extraStyles, onClick }: ButtonProps) {
  return (
    <button className={[styles.button, "btn", `btn-${mode}`].join(" ")} style={{ ...extraStyles }} onClick={onClick}>
      {children}
    </button>
  );
}
