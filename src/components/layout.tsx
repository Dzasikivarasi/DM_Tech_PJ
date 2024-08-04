import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function Layout(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}
