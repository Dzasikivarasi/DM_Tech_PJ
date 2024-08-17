import styles from "./rating.module.scss";

type RatingProps = {
  rating: number;
};

export default function Rating({ rating }: RatingProps): JSX.Element {
  return (
    <div className={`${styles.rating}`}>
      {/* <div className={`${styles.rating__container} ${styles.rating__stars}`}> */}
      <div
        className={`${rating === undefined || rating === 0 ? styles.default_rating : `${styles.rating__container} ${styles.rating__stars}`}`}
      >
        <span style={{ width: `${rating * 20}%` }}></span>
      </div>
    </div>
  );
}
