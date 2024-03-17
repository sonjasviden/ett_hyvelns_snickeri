import { Image, Nav, Navbar } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";
import useResponsiveView from "../hooks/useResponsiveView";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const isMobileView = useResponsiveView();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      {isMobileView ? (
        <Navbar expand="md" className="align-items-center">
          <Navbar.Brand>
            <Image
              style={{ width: "100px" }}
              className="logo"
              src="/images/logo.png"
            />
          </Navbar.Brand>
          <div className="toggler-box">
            <IoIosMenu
              className="navbar-toggler"
              onClick={toggle}
              aria-controls="basic-navbar-nav"
            />
          </div>

          <Navbar.Collapse in={open} id="basic-navbar-nav">
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
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <div className="navigation">
          <div className="logo">
            <Image src="/images/logo.png" />
          </div>
          <HomeNavbar />
        </div>
      )}
    </>
  );
};

export default Navigation;
