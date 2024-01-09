import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Bag, PersonCircle } from 'react-bootstrap-icons'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { Store } from './Store'

function App() {

  const { 
   state:{ mode, cart, userInfo },
   dispatch,
   } = useContext(Store)

   useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE'})
  }

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('carItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  return (
    <div className='flex-cloumn vh-100'>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg"> 
          <Container className="ms-5">
            <LinkContainer to="/" className='link-container'>
              <img src="/images/ASTRO_Logo.png" alt='ASTRO_Logo' className='navbar-logo' />
            </LinkContainer>           
          </Container>
          <Nav className="me-5">
            <a href="/blog" className="nav-link">Blog</a>
            <a href="/shop" className='nav-link'>Shop</a>
            <Link to="/cart" className='nav-link'>
              <a href="/cart" className='nav-link'> <Bag /> </a>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg= "danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
               </Link>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <Link
                  className='dropdown-item'
                  to='#signout'
                  onClick={signoutHandler}
                >
                  Esci
                </Link>
              </NavDropdown>
            ): (
              <Link className='nav-link' to="/signin">
                  <a href="/signin" className='nav-link'> <PersonCircle /> </a>
              </Link>
            )}
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
