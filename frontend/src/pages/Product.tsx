import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import { convertProductToCartItem, getError } from '../utils'
import { ApiError } from '../types/ApiError'
import MessageBox from '../components/MessageBox'
import { Badge, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useContext, useState } from 'react'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import axios from 'axios'
import "../styles/Comments.css";

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

    //comment initial state
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState(product?.commenti || []);

    //Function to handle the submit of the comment
    const submitCommmentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const url = `/api/comments/${product?._id}`;
            console.log('Submitting comment to:', url);
            const { data } = await axios.post(url, {
                text: comment,
                rating,
                author: "Nome Autore",
            });
            setComments([...comments, data]);
            setComment('');
            setRating(0);
            toast.success('Commento pubblicato con successo')
        }catch(error){
            console.error("Errore nell'invio del commento: ", error);
            toast.error(getError(error as unknown as ApiError))
        }
    };

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
                    <ListGroup.Item>
                        
                        </ListGroup.Item>   
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
        <div className="comment-section">
            <h2>Commenti</h2>
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div className="comment-item" key={comment._id}>
                    <div className="comment-author">{comment.autore}</div>
                    <div className="comment-rating">
                     <Rating rating={comment.valutazione} numReviews={1}></Rating>
                     <span>{comment.valutazione} / 5</span>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                ))
            ) : ( 
                <p>Ancora nessun commento</p>
            )}
            <Form className="comment-form" onSubmit={submitCommmentHandler}>
                <Form.Group controlId="comment">
                    <Form.Label>Scrivi un commento</Form.Label>
                    <Form.Control
                      as="textarea" 
                      rows={3} 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="rating">
                    <Form.Label>Valutazione</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))}

                       >
                        <option value="">Seleziona...</option>
                        <option value="1">1 - Pessimo</option>
                        <option value="2">2 - Scarso</option>
                        <option value="3">3 - Buono</option>
                        <option value="4">4 - Molto Buono</option>
                        <option value="5">5 - Eccellente</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Invia</Button>
            </Form>
          </div>
      </div>
    );
}
