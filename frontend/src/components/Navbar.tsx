import { FaBars, FaTimes } from "react-icons/fa";
import "../index.css";
import { useRef } from "react";
import { useContext, useEffect } from "react";
import { Badge, Button, Container, Nav, NavDropdown } from "react-bootstrap";
import { Bag, PersonCircle } from "react-bootstrap-icons";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Store } from "../Store";

function Navbar() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("carItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const navRef = useRef();

  const navShowHide = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <LinkContainer to="/" className="link-container">
        <img
          src="/images/ASTRO_Logo.png"
          alt="ASTRO_Logo"
          className="navbar-logo"
        />
      </LinkContainer>
      <nav ref={navRef}>
        <LinkContainer to="/blog" onClick={navShowHide}>
          <Nav.Link>Blog</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/shop" onClick={navShowHide}>
          <Nav.Link>Shop</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/cart" className="cart" onClick={navShowHide}>
          <Nav.Link>
            <Bag />
            {cart.cartItems.length > 0 && (
              <Badge className="badge-cart" pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Nav.Link>
        </LinkContainer>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
            <LinkContainer to="/orderhistory" onClick={navShowHide}>
              <NavDropdown.Item>Storico Ordini</NavDropdown.Item>
            </LinkContainer>
            <Link
              className="dropdown-item"
              to="#signout"
              onClick={signoutHandler}
            >
              Esci
            </Link>
          </NavDropdown>
        ) : (
          <Link className="nav-link" to="/signin" onClick={navShowHide}>
            <a href="/signin" className="nav-link">
              {" "}
              <PersonCircle />{" "}
            </a>
          </Link>
        )}
        <button className="nav-btn nav-close-btn" onClick={navShowHide}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={navShowHide}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
