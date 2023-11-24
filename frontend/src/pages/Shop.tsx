import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { sampleProducts } from '../data'

export default function Shop() {
  return (
    <Row>
      {sampleProducts.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={'/product/' + product.slug}>
            <img src={product.immagine} alt={product.nome} className="product-image"/>
            <h2>{product.nome}</h2>
            <p>${product.prezzo}</p>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
