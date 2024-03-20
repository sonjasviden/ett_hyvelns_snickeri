import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import HomeNavbar from "../components/HomeNavbar";

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage ? <Navigation /> : <HomeNavbar />}
      <Outlet />
    </>
  );
};

export default Layout;
