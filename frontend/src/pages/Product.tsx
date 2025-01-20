import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductDetailsBySlugQuery,
} from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import { calcPriceTaxed, convertProductToCartItem, getError } from "../utils";
import { ApiError } from "../types/ApiError";
import MessageBox from "../components/MessageBox";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Dropdown,
  ListGroup,
  Row,
  Modal,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";

import "../styles/ProductPage.css";
import ProductModal from "../components/ProductModal";

export default function Product() {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    console.log("Selected size:", size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    console.log("Selected color:", color);
  };

  const addToCartHandler = () => {
    if (!selectedSize || !selectedColor) {
      toast.warn("Seleziona sia la taglia che il colore");
      return;
    }

    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.disponibilita < quantity) {
      toast.warn("Mi dispiace. Il prodotto non è disponibile");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...convertProductToCartItem(product!),
        quantity,
        selectedSize,
        selectedColor,
      },
    });
    toast.success("Prodotto aggiunto al carrello");
    navigate("/cart");
  };

  const priceTaxed = calcPriceTaxed(product?.prezzo || 0);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setIsAdmin(userInfo.isAdmin);
    }
  }, []);

  const { mutateAsync: deleteProduct } = useDeleteProductMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteProductHandler = async () => {
    try {
      await deleteProduct(product!._id);
      toast.success("Prodotto eliminato con successo");
      navigate("/shop");
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div className="product-page-container">
      <Helmet>
        <title>ASTRO - {product.nome}</title>
      </Helmet>
      <div className="product-main-column">
        <div className="carousel-container">
          <div className="carousel">
            <Carousel>
              <Carousel.Item>
                <img
                  className="carousel-image"
                  src={product.immagine}
                  alt={product.nome}
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="carousel-image"
                  src="../images/placeholder.png"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="carousel-image"
                  src="../images/placeholder.png"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div className="product-details-container">
          <div className="product-details">
            <ListGroup className="list-group-container" variant="flush">
              <ListGroup.Item>
                <h1 className="product-name">{product.nome}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.valutazione}
                  numReviews={product.numRecensioni}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                Prezzo: €{priceTaxed} (IVA inclusa)
              </ListGroup.Item>
              <ListGroup.Item>
                Descrizione:
                <p className="product-description">{product.descrizione}</p>
              </ListGroup.Item>
            </ListGroup>
            <div className="selectors">
              <Dropdown className="size-selector">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {" "}
                  {selectedSize || "Taglia"}{" "}
                </Dropdown.Toggle>
                {product.taglie && product.taglie.length > 0 ? (
                  <Dropdown.Menu>
                    {product.taglie.map((size) => (
                      <Dropdown.Item
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Item disabled>
                    Nessuna taglia disponibile
                  </Dropdown.Item>
                )}
              </Dropdown>
              <Dropdown className="color-selector">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {" "}
                  {selectedColor || "Colore"}{" "}
                </Dropdown.Toggle>
                {product.colori && product.colori.length > 0 ? (
                  <Dropdown.Menu>
                    {product.colori.map((color) => (
                      <Dropdown.Item
                        key={color}
                        onClick={() => handleColorSelect(color)}
                      >
                        {color}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Item disabled>
                    Nessun colore disponibile
                  </Dropdown.Item>
                )}
              </Dropdown>
            </div>
          </div>

          <div className="add-to-cart-container">
            <Card className="add-to-cart-card">
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
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                  {isAdmin && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <ProductModal
                          name="Modifica prodotto"
                          product={product}
                        />
                      </div>
                      <div className="d-grid mt-2">
                        <Button
                          variant="danger"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          Elimina prodotto
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare il prodotto "{product.nome}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowDeleteModal(false);
              deleteProductHandler();
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
