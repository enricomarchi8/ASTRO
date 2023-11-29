import { Product } from "../types/Product"
import { Card } from 'react-bootstrap'

function ProductItem({ product }: { product: Product}) {
    return <Card>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.nome} />
            </Link>
            <Card.body>
              <Link to={`/product/${product.slug}`}>
                <Card.Tittle>{product.nome}</Card.Tittle>
              </Link>
              <Rating rating={product.valutazione} numReviews={product.numRecensioni} />
              <Card.Text>${product.price}</Card.Text>
              y{product.disponibilita === 0 ?(
                <Button variant="light" disabled>
                    Non disponibile
                </Button>
              ) : (
                <Button>Aggiungi al Carrello</Button>
              )}
            </Card.body>
    </Card>
}

export default ProductItem