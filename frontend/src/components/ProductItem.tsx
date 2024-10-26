import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "./Rating";
import { Store } from "../Store";
import { useContext } from "react";
import { CartItem } from "../types/Cart";
import { calcPriceTaxed, convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state 

  const addToCartHandler = (item: CartItem) => {
      const existItem = cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity + 1 : 1
      if (product.disponibilita < quantity) {
        alert('Mi dispiace. Il prodotto non è più disponibile')
        return
      }
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity}
      })
      toast.success('Prodotto aggiunto al carrello')
  }

  const priceTaxed = calcPriceTaxed(product.prezzo)

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
      <Card className="h-100">
        <Card.Img
          src={product.immagine}
          className="card-img-top"
          alt={product.nome}
        />
        <Card.Body>
          <Card.Title>{product.nome}</Card.Title>
          <Rating
            rating={product.valutazione}
            numReviews={product.numRecensioni}
          />
          <Card.Text>€{priceTaxed}</Card.Text>
          {product.disponibilita === 0 ? (
            <Button variant="light" disabled>
              Non disponibile
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault(); // Evita che il click sul bottone segua il link
                addToCartHandler(convertProductToCartItem(product));
              }}
            >
              Aggiungi al Carrello
            </Button>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ProductItem;
