import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";

export default function PlaceOrder() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.22 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Helmet>
        <title>ASTRO - Riepilogo Ordine</title>
      </Helmet>
      <h1 className="my-3">Riepilogo Ordine</h1>
      <Row>
        <Col xl={9}>
          <Card className="card-checkout">
            <Card.Body>
              <Card.Title>Spedizione</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Indirizzo:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Modifica</Link>
            </Card.Body>
          </Card>

          <Card className="card-checkout">
            <Card.Body>
              <Card.Title>Articoli</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6} className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded thumbnail me-3"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={6}>
                        <Row>
                          <Col xs={6} className="text-end">
                            <strong>Taglia:</strong>
                          </Col>
                          <Col xs={6} className="text-end">
                            {item.selectedSize || "N/A"}
                          </Col>
                          <Col xs={6} className="text-end">
                            <strong>Colore:</strong>
                          </Col>
                          <Col xs={6} className="text-end">
                            {item.selectedColor || "N/A"}
                          </Col>
                          <Col xs={6} className="text-end">
                            <strong>Quantità:</strong>
                          </Col>
                          <Col xs={6} className="text-end">
                            {item.quantity}
                          </Col>
                          <Col xs={6} className="text-end">
                            <strong>Singola Unità:</strong>
                          </Col>
                          <Col xs={6} className="text-end">
                            €{item.price}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Modifica</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="card-report">
            <Card.Body>
              <Card.Title>Resoconto Ordine</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Articoli</Col>
                    <Col>€{cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>di cui IVA</Col>
                    <Col>€{cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Spedizione</Col>
                    <Col>€{cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Totale Ordine</strong>
                    </Col>
                    <Col>
                      <strong>€{cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0 || isPending}
                    >
                      Conferma Ordine
                    </Button>
                    {isPending && <LoadingBox></LoadingBox>}
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
