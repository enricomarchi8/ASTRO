import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "./Rating";

function ProductItem({ product }: { product: Product }) {
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
          <Button>Aggiungi al Carrello</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
