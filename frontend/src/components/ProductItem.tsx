import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "./Rating";
import { calcPriceTaxed } from "../utils";
import { useState } from "react";

function ProductItem({ product }: { product: Product }) {
  const priceTaxed = calcPriceTaxed(product.prezzo);

  const [isHovered, setIsHovered] = useState(false);
  const hoverStyle = {
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.2s ease-in-out",
  };

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
      <Card
        className="h-100"
        style={hoverStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Img
          src={product.immagine}
          className="card-img-top"
          alt={product.nome}
        />
        <Card.Body>
          <Card.Title className="truncated-text">{product.nome}</Card.Title>
          <Rating
            rating={product.valutazione}
            numReviews={product.numRecensioni}
          />
          <br></br>
          <Card.Text>
            <strong>{priceTaxed} €</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ProductItem;
