import { useState } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import useResponsiveView from "../hooks/useResponsiveView";

const HomeNavbar = () => {
  const [open, setOpen] = useState(false);
  const isMobileView = useResponsiveView();

  const toggle = () => {
    if (isMobileView) {
      setOpen(!open);
    }
  };
  return (
    <div>
      <Navbar expand="md">
        {isMobileView ? (
          <Image
            className="navbar-blob-mobile"
            src="/images/navbar-blob-mobile.png"
          />
        ) : (
          <div className="navbar-blob">
            <Image src="/images/navbar-blob.png" />
          </div>
        )}

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
          {isMobileView && (
            <div className="footer">
              <p>© Ett Hyvelns Snickeri AB</p>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default HomeNavbar;
