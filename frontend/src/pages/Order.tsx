import { useContext } from "react";
import { Store } from "../Store";
import { useParams, Link } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../hooks/orderHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

export default function Order() {
    const { state } = useContext(Store)
    const { userInfo } = state

    const params = useParams()
    const { id: orderId } = params

    const { data: order, isPending, error } = useGetOrderDetailsQuery(orderId!)

    return isPending ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !order ? (
        <MessageBox variant="danger">Ordine non trovato</MessageBox>
    ) : (
        <div>
            <Helmet>
                <title>Ordine {orderId}</title>
            </Helmet>
            <h1 className="my-3">Ordine {orderId}</h1>
            <Row>
                <Col md={8}>
                   <Card className="mb-3">
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

                   <Card className="mb-3">
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

                   <Card className="mb-3">
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
                                                ></img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>€{item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                   </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
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
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}