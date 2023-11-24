import { Container, Nav, Navbar } from 'react-bootstrap'
import { Bag, Cart, PersonCircle, RocketTakeoff } from 'react-bootstrap-icons'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='flex-cloumn vh-100'>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container className="ms-5">
            <a className="navbar-brand" href="/"> 
              ASTRO <RocketTakeoff /> 
            </a>
          </Container>
          <Nav className="me-5">
            <a href="/blog" className="nav-link">Blog</a>
            <a href="/shop" className='nav-link'>Shop</a>
            <a href="/cart" className='nav-link'> <Bag /> </a>
            <a href="/account" className='nav-link'> <PersonCircle /> </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>        
      </main>
      <footer>
        <div className='text-center'>
          Footer
        </div>
      </footer>
    </div>
  )
}

export default App
