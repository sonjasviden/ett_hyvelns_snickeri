import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isContactPage = location.pathname === "/kontakt";

  return (
    <>
      {!isHomePage ? <Navigation /> : <HomeNavbar />}
      <Outlet />
      {!isContactPage && <Footer />}
    </>
  );
};

export default Layout;
