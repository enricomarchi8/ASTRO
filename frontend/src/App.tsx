import { useContext, useEffect } from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Bag, PersonCircle } from "react-bootstrap-icons";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Store } from "./Store";

function App() {
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

  return (
    <div className="flex-cloumn vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container className="justify-content-center">
            <div id="icona-home">
              <LinkContainer to="/" className="link-container">
                <img
                  src="/images/ASTRO_Logo.png"
                  alt="ASTRO_Logo"
                  className="navbar-logo"
                />
              </LinkContainer>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <LinkContainer to="/blog">
                  <Nav.Link>Blog</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/shop">
                  <Nav.Link>Shop</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/cart" className="cart">
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
                    <LinkContainer to="/orderhistory">
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
                  <Link className="nav-link" to="/signin">
                    <a href="/signin" className="nav-link">
                      {" "}
                      <PersonCircle />{" "}
                    </a>
                  </Link>
                )}
                <Button variant={mode} onClick={switchModeHandler}>
                  <i
                    className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                  ></i>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="h-100">
        <Container fluid={true} className="p-0" style={{ height: "86%" }}>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">Copyright © 2024 ASTRO, Inc.</div>
      </footer>
    </div>
  );
}

export default App;
