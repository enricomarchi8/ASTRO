import { useContext, useEffect } from "react";
import { Store } from "../Store";
import { useParams, Link } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../hooks/orderHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

export default function Order() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const { mutateAsync: payOrder, isPending: loadingPay } =
    usePayOrderMutation();

  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success("Ordine pagato");
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypalConfig!.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalConfig]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    async createOrder(_data, actions) {
      const orderID = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order!.totalPrice.toString(),
            },
          },
        ],
      });
      return orderID;
    },
    async onApprove(_data, actions) {
      const details = await actions.order!.capture();
      try {
        await payOrder({ orderId: orderId!, ...details });
        refetch();
        toast.success("Ordine pagato");
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Ordine non trovato</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>ASTRO - Ordine {orderId}</title>
      </Helmet>
      <h1 className="my-3">Ordine {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="card-checkout">
            <Card.Body>
              <Card.Title>Spedizione</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {order.shippingAddress.fullName} <br />
                <strong>Indirizzo: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Consegnato il {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Non ancora consegnato</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="card-checkout">
            <Card.Body>
              <Card.Title>Pagamento</Card.Title>
              <Card.Text>
                <strong>Metodo di pagamento:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Pagato il {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Non ancora pagato</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="card-checkout">
            <Card.Body>
              <Card.Title>Articoli</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded thumbnail"
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card-report">
            <Card.Body>
              <Card.Title>Riepilogo Ordine</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Articoli</Col>
                    <Col>€{order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Spedizione</Col>
                    <Col>€{order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>di cui IVA</Col>
                    <Col>€{order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Totale Ordine</Col>
                    <Col>€{order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant="danger">
                        Errore nella connessione con PayPal
                      </MessageBox>
                    ) : (
                      <div>
                        <Button className="button-pay" onClick={testPayHandler}>
                          <img
                            className="img-pay"
                            src="/images/Google_Pay_Logo.png"
                            alt="Google_Pay_Logo"
                          ></img>
                        </Button>
                        <Button className="button-pay" onClick={testPayHandler}>
                          <img
                            className="img-pay"
                            src="/images/Apple-Pay-Logo.png"
                            alt="Apple-Pay-Logo"
                          ></img>
                        </Button>
                        {/*
                                                <PayPalButtons
                                                    {...paypalbuttonTransactionProps}
                                                ></PayPalButtons>
                                                */}
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
