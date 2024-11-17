import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import { calcPriceTaxed, convertProductToCartItem, getError } from '../utils'
import { ApiError } from '../types/ApiError'
import MessageBox from '../components/MessageBox'
import { Badge, Button, Card, Carousel, Col, Dropdown, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useContext, useState } from 'react'
import { Store } from '../Store'
import { toast } from 'react-toastify'

import '../styles/ProductPage.css';


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

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        console.log("Selected size:", size); // per debugging
    };
    
    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        console.log("Selected color:", color); // per debugging
    };

    const addToCartHandler = () => {
        if (!selectedSize || !selectedColor) {
            toast.warn('Seleziona sia la taglia che il colore');
            return
        }

        const existItem = cart.cartItems.find((x) => x._id === product!._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product!.disponibilita < quantity) {
            toast.warn('Mi dispiace. Il prodotto non è disponibile')
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { 
                ...convertProductToCartItem(product!), 
                quantity,
                selectedSize,
                selectedColor
            },
        })
        toast.success('Prodotto aggiunto al carrello')
        navigate('/cart')
    }

    const priceTaxed = calcPriceTaxed(product?.prezzo || 0); //gestiamo anche il fatto che product possa non essere ancora definito

    return isLoading ? (
      <LoadingBox /> 
    ) : error ? (
      <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !product ? (
      <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
        <div className="product-page-container">
        <Helmet>
            <title>ASTRO - {product.nome}</title>
        </Helmet>
        <div className="product-main-column">
            {/* Carousel Section */}
            <div className="carousel-container">
                <div className="carousel">
                    <Carousel>
                        <Carousel.Item>
                        <img className="carousel-image" src={product.immagine} alt={product.nome} />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className='carousel-image' src='../images/placeholder.png'/>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className='carousel-image' src='../images/placeholder.png'/>
                        </Carousel.Item>

                    </Carousel>
                </div>
            </div>

            {/* Product Details Section */}
            <div className='product-details-container'>
                <div className="product-details">
                    <ListGroup className='list-group-container' variant='flush'>
                        <ListGroup.Item>
                            <h1 className="product-name">{product.nome}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.valutazione} numReviews={product.numRecensioni}></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>Prezzo: €{priceTaxed} (IVA inclusa)</ListGroup.Item>
                        <ListGroup.Item>
                            Descrizione:
                            <p className='product-description'>{product.descrizione}</p>
                        </ListGroup.Item>
                    </ListGroup>                  
                    <div className="selectors">
                        <Dropdown className="size-selector">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic"> {selectedSize || "Taglia"} </Dropdown.Toggle>
                                {product.taglie && product.taglie.length > 0 ? (
                                    <Dropdown.Menu>
                                        {product.taglie.map((size) => (
                                            <Dropdown.Item key={size} onClick={() => handleSizeSelect(size)}>
                                                {size}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                ) : (
                                    <Dropdown.Item disabled>Nessuna taglia disponibile</Dropdown.Item>
                                )}
                        </Dropdown>
                        <Dropdown className="color-selector">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic"> {selectedColor || "Colore"} </Dropdown.Toggle>
                                {product.colori && product.colori.length > 0 ? (
                                    <Dropdown.Menu>
                                        {product.colori.map((color) => (
                                            <Dropdown.Item key={color} onClick={() => handleColorSelect(color)}>
                                                {color}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                ) : (
                                    <Dropdown.Item disabled>Nessun colore disponibile</Dropdown.Item>
                                )}
                        </Dropdown>
                    </div>
                </div>
                {/* Add to Cart Section */}
                <div className="add-to-cart-container">
                    <Card className='add-to-cart-card'>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Prezzo: </Col>
                                        <Col>€{priceTaxed}</Col>
                                    </Row>         
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>
                                            {product.disponibilita > 0 ? (
                                                    <Badge bg="success">Disponibile</Badge>
                                                ) : (
                                                    <Badge bg="danger">Non Disponibile</Badge>
                                                )} 
                                        </Col>
                                    </Row>  
                                </ListGroup.Item>
                                {product.disponibilita > 0 && (
                                    <ListGroup.Item>
                                        <div className='d-grid'>
                                            <Button onClick={addToCartHandler} variant="primary">
                                                Aggiungi al carrello
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>          
        </div>
    </div>
    );
}
