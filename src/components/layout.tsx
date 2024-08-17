import { Outlet } from "react-router-dom";
import Header from "./header/Header";

export default function Layout(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}
