import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import { convertProductToCartItem, getError } from '../utils'
import { ApiError } from '../types/ApiError'
import MessageBox from '../components/MessageBox'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import { toast } from 'react-toastify'

export default function Product() {
    const params = useParams()
    const { slug } = params
    const {
      data: product,
      isLoading,
      error,
    } = useGetProductDetailsBySlugQuery(slug!)

    const { state, dispatch } = useContext(Store)
    const { cart } = state

    const navigate = useNavigate()

    const addToCartHandler = () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product!.disponibilita < quantity) {
            toast.warn('Mi dispiace. Il prodotto non è disponibile')
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...convertProductToCartItem(product!), quantity},
        })
        toast.success('Prodotto aggiunto al carrello')
        navigate('/cart')
    }

    return isLoading ? (
      <LoadingBox /> 
    ) : error ? (
      <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !product ? (
      <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
      <div>
        <Row>
            <Col md={4} className='image-product-column'>
                <img className='large' src={product.immagine} alt={product.nome}></img>
            </Col>
            <Col md={3} className='col-product'>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Helmet>
                            <title>ASTRO- {product.nome}</title>
                        </Helmet>
                        <h1 className='product-name'>{product.nome}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                          rating={product.valutazione}
                          numReviews={product.numRecensioni}
                        ></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>Prezzo: €{product.prezzo}</ListGroup.Item>
                    <ListGroup.Item>
                        Descrizione: 
                        <p>{product.descrizione}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>Commenti: </ListGroup.Item>
                    <ListGroup.Item>Domande: </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card className='card-add'>
                    <Card.Body className='card-body-add'>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Prezzo:</Col>
                                    <Col>€{product.prezzo}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Status: </Col>
                                    <Col>
                                    {product.disponibilita > 0 ? (
                                        <Badge className='product-badge' bg="success">Disponibile</Badge>
                                    ) : (
                                        <Badge className='product-badge' bg="danger">Non Disponibile</Badge>
                                    )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.disponibilita > 0 &&(
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button onClick={addToCartHandler} variant="primary">Aggiungi al carrello</Button>
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
