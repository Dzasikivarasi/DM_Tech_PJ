import styles from "./loader.module.scss";

export default function Loader(): JSX.Element {
  return (
    <div className={styles["loader-container"]}>
      <img
        className={styles["loader"]}
        src="../../../public/img/icons-svg/loader.svg"
        alt="Loading..."
        width="24"
        height="24"
      />
    </div>
  );
}
