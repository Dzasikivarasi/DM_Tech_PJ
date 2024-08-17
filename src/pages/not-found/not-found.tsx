import { Link } from "react-router-dom";
import { AppRoute } from "../../constants";

export default function NotFound(): JSX.Element {
  return (
    <div className="container__not-found">
      <p className="message__not-found">«Такой страницы не существует»</p>
      <Link to={`${AppRoute.Products}`}>
        <button className="button__not-found">На главную</button>
      </Link>
    </div>
  );
}
