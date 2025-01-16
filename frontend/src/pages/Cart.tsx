import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import MessageBox from "../components/MessageBox";

export default function Cart() {
  const navigate = useNavigate();

  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn("Mi dispiace, il prodotto non è disponibile.");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div className="mt-4">
      <Helmet>
        <title>ASTRO - Carrello</title>
      </Helmet>
      <h1 style={{ color: "#be2ed6" }}>
        <strong>Carrello</strong>
      </h1>
      <Row>
        <Col lg={8} className="mt-3">
          {cartItems.length === 0 ? (
            <MessageBox>
              Il Carrello è vuoto. <Link to="/shop"> Esplora il catalogo </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroupItem key={item._id}>
                  <Row className="row-cart" /*align-items-center*/>
                    <Col lg={4} className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail me-3" //img-fluid rounded img-thumbnail
                      ></img>{" "}
                      <Link
                        to={`/product/${item.slug}`}
                        className="truncated-text"
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      lg={3}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        variant={mode}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col lg={3}>
                      <Row>
                        <Col>
                          <div>
                            <strong>Prezzo:</strong> €{item.price}
                          </div>
                          {item.selectedSize && (
                            <div>
                              <strong>Taglia:</strong> {item.selectedSize}
                            </div>
                          )}
                          {item.selectedColor && (
                            <div>
                              <strong>Colore:</strong> {item.selectedColor}
                            </div>
                          )}
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                          <Button
                            onClick={() => removeItemHandler(item)}
                            variant={mode}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={4} className="mt-3">
          <Card className="card-cart">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Totale ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    Articoli) : €
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Procedi al Pagamento
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
