import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
//import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './index.css'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreProvider } from './Store'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Shipping from './pages/Shipping'
import PaymentMethod from './pages/PaymentMethod'
import ProtectedRoute from './components/ProtectedRoute'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistory from './pages/OrderHistory'
import BlogHome from './pages/BlogHome'
import BlogPost from './pages/BlogPost'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="/blog" element={<BlogHome />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product/:slug" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />    
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<PaymentMethod />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Route>  
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ 'clientId' : 'sb' }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
        </PayPalScriptProvider>  
    </StoreProvider>
  </React.StrictMode>
)
