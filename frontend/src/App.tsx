import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import './App.css'
import { sampleProducts } from './data'

function App() {

  return (
    <div className='d-flex flex-cloumn vh-100'>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>ASTRO</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/cart" className="nav-link">Cart</a>
            <a href="/signin" className='nav-link'>Sign In</a>
            <a href="/news" className='nav-link'>News</a>
            <a href="/blog" className='nav-link'>Blog In</a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Row>
          {
          sampleProducts.map(product => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <img src={product.image} alt={product.name} className="product-image"/>
            <h2>{product.name}</h2>
            <p>€{product.prezzo}</p>
          </Col>
            ))}
          </Row>
        </Container>        
      </main>
      <footer>
        <div className='text-center'>
          Qui va il footer
        </div>
      </footer>
    </div>
  )
}

export default App
