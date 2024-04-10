import { Image, Nav, Navbar } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";
import useResponsiveView from "../hooks/useResponsiveView";
import { IoIosMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const isMobileView = useResponsiveView();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (isMobileView) {
      setOpen(!open);
    }
  };

  return (
    <>
      {isMobileView ? (
        <Navbar expand="md" className="align-items-center">
          <Navbar.Brand>
            <Link to={"/"}>
              <Image
                style={{ width: "100px", marginLeft: "15px" }}
                className="logo"
                src="/images/logo.png"
              />
            </Link>
          </Navbar.Brand>
          <div className="toggler-box">
            <IoIosMenu
              className="navbar-toggler"
              onClick={toggle}
              aria-controls="basic-navbar-nav"
            />
          </div>

          <Navbar.Collapse in={open || !isMobileView} id="basic-navbar-nav">
            <Nav className={isMobileView ? "mobile-nav" : ""}>
              <Nav.Link
                onClick={toggle}
                className="nav-item"
                as={NavLink}
                end
                to="/"
              >
                Start
              </Nav.Link>
              <Nav.Link
                onClick={toggle}
                className="nav-item"
                as={NavLink}
                end
                to="/galleri"
              >
                Galleri
              </Nav.Link>
              <Nav.Link
                onClick={toggle}
                className="nav-item"
                as={NavLink}
                end
                to="/kontakt"
              >
                Kontakt
              </Nav.Link>
              <Nav.Link
                onClick={toggle}
                className="nav-item"
                as={NavLink}
                end
                to="/om-oss"
              >
                Om oss
              </Nav.Link>
            </Nav>
            <div className="footer">
              <p>© {new Date().getFullYear()} Ett Hyvelns Snickeri AB</p>
            </div>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <div className="navigation">
          <Link to={"/"}>
            <div className="logo">
              <Image src="/images/logo.png" />
            </div>
          </Link>
          <HomeNavbar />
        </div>
      )}
    </>
  );
};

export default Navigation;
