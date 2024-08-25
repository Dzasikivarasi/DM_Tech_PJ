import styles from "./not-found.module.scss";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../constants";
import Button from "../../components/button/Button";

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();

  const onButtonClick = (): void => {
    navigate(AppRoute.Products);
  };
  return (
    <div className={styles["not-found"]}>
      <p className={styles["not-found_message"]}>
        Такой страницы не существует
      </p>
      <Button
        className="submit-btn"
        buttonText={"На главную"}
        buttonClickHandler={onButtonClick}
      />
    </div>
  );
}
