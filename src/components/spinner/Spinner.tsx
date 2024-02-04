import styles from "./Spinner.module.css";

type SpinnerProps = {
  size: "medium" | "large";
};

function Spinner({ size }: SpinnerProps) {
  return <span className={[styles.spinner, styles[size]].join(" ")}></span>;
}

export default Spinner;
