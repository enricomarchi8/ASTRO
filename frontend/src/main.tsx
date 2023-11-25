import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './index.css'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Account from './pages/Account'
import axios from 'axios'

axios.defaults.baseURL = 
process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="blog" element={<Blog />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product/:slug" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="account" element={<Account />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
