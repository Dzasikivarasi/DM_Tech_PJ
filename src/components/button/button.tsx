import styles from "./button.module.scss";

type ButtonProps = {
  className: string;
  classActive?: boolean;
  buttonText: string;
  buttonClickHandler?: () => void;
  disabled?: boolean;
};

export default function Button({
  className,
  classActive = false,
  buttonText,
  buttonClickHandler,
  disabled,
}: ButtonProps): JSX.Element {
  const onButtonClick = (): void => {
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
          disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}
