import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "./Rating";
import { Store } from "../Store";
import { useContext } from "react";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";

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
  }

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.immagine}
          className="card-img-top"
          alt={product.nome}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.nome}</Card.Title>
        </Link>
        <Rating
          rating={product.valutazione}
          numReviews={product.numRecensioni}
        />
        <Card.Text>${product.prezzo}</Card.Text>
        {product.disponibilita === 0 ? (
          <Button variant="light" disabled>
            Non disponibile
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(convertProductToCartItem(product))}>
            Aggiungi al Carrello
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
