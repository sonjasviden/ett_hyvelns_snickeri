import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const isHomePage = location.pathname === "/";
  const isContactPage = location.pathname === "/kontakt";

  return (
    <>
      {!isHomePage ? <Navigation /> : <HomeNavbar />}
      <Outlet />
      {!isContactPage && !currentUser && <Footer />}
    </>
  );
};

export default Layout;
