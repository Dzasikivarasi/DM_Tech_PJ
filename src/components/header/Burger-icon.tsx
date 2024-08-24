import styles from "./header.module.scss";
type BurgerIconProps = {
  menuHandler: () => void;
};

export default function BurgerIcon({
  menuHandler,
}: BurgerIconProps): JSX.Element {
  const onClickHandler = (): void => {
    menuHandler();
  };

  return (
    <img
      onClick={onClickHandler}
      className={styles["header_mobile"]}
      src="/img/icons-svg/mobile-menu.svg"
      alt="меню"
    />
  );
}
