import styles from "./rating.module.scss";

export default function Rating(): JSX.Element {
  const rating = 4.8;
  return (
    <div className={`${styles.rating}`}>
      <div className={`${styles.rating__container} ${styles.rating__stars}`}>
        <span style={{ width: `${rating * 20}%` }}></span>
      </div>
    </div>
  );
}
