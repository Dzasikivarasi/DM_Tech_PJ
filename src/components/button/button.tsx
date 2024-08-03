import styles from "./button.module.scss";

type ButtonProps = {
  className: string;
  classActive?: boolean;
  buttonText: string;
  buttonClickHandler?: () => void;
};

export default function Button({
  className,
  classActive = false,
  buttonText,
  buttonClickHandler,
}: ButtonProps): JSX.Element {
  const onButtonClick = () => {
    if (buttonClickHandler) {
      buttonClickHandler();
    }
  };

  return (
    <>
      <div>
        <button
          className={`${styles.button} ${styles[className]} ${
            classActive ? styles[`${className}-active`] : ""
          }`}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}
