import { useContext, useEffect } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Bag, PersonCircle, RocketTakeoff } from 'react-bootstrap-icons'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'

function App() {

  const { 
   state:{ mode },
   dispatch,
   } = useContext(Store)

   useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE'})
  }

  return (
    <div className='flex-cloumn vh-100'>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg"> //in caso si voglia rimuovere il lock colore dalla nav rimuovere bg e variant 
          <Container className="ms-5">
            <a className="navbar-brand" href="/"> 
              ASTRO <RocketTakeoff /> 
            </a>
          </Container>
          <Nav className="me-5">
            <a href="/blog" className="nav-link">Blog</a>
            <a href="/shop" className='nav-link'>Shop</a>
            <a href="/cart" className='nav-link'> <Bag /> </a>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
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
