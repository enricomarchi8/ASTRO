import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import MessageBox from '../components/MessageBox'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'

export default function Product() {
    const params = useParams()
    const { slug } = params
    const {
      data: product,
      isLoading,
      error,
    } = useGetProductDetailsBySlugQuery(slug!)

    return isLoading ? (
      <LoadingBox /> 
    ) : error ? (
      <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !product ? (
      <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
      <div>
        <Row>
            <Col md={6}>
                <img className='large' src={product.immagine} alt={product.nome}></img>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Helmet>
                            <title>{product.nome}</title>
                        </Helmet>
                        <h1>{product.nome}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                          rating={product.valutazione}
                          numReviews={product.numRecensioni}
                        ></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>Prezzo: ${product.prezzo}</ListGroup.Item>
                    <ListGroup.Item>
                        Descrizione: 
                        <p>{product.descrizione}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>Commenti: </ListGroup.Item>
                    <ListGroup.Item>Domande: </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Prezzo:</Col>
                                    <Col>${product.prezzo}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Status: </Col>
                                    <Col>
                                    {product.disponibilita > 0 ? (
                                        <Badge bg="success">Disponibile</Badge>
                                    ) : (
                                        <Badge bg="danger">Non Disponibile</Badge>
                                    )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.disponibilita > 0 &&(
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button variant="primary">Aggiungi al carrello</Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </div>
    )
}
